/* Byte-range media delivery over the explicit Workers asset manifest. */
export function parseRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value)
  if (!match || (!match[1] && !match[2])) return null
  let start, end
  if (!match[1]) {
    const suffix = Number(match[2])
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return null
    start = Math.max(0, size - suffix); end = size - 1
  } else {
    start = Number(match[1]); end = match[2] ? Number(match[2]) : size - 1
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) return null
    end = Math.min(end, size - 1)
  }
  return { start, end }
}

export function sliceStream(body, start, end) {
  const reader = body.getReader()
  let offset = 0
  return new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) throw new Error('Asset ended before the declared byte range')
          const previous = offset
          offset += value.byteLength
          if (offset <= start) continue
          const chunk = value.subarray(Math.max(0, start - previous), Math.min(value.byteLength, end + 1 - previous))
          if (chunk.byteLength) controller.enqueue(chunk)
          if (offset > end) {
            controller.close()
            await reader.cancel()
          }
          return
        }
      } catch (error) {
        controller.error(error)
        await reader.cancel(error).catch(() => {})
      }
    },
    cancel(reason) { return reader.cancel(reason) },
  })
}

export async function serveVideo(request, env, context, assets) {
  const url = new URL(request.url)
  const item = Object.hasOwn(assets, url.pathname) ? assets[url.pathname] : null
  if (!item) return new Response('Not found', { status: 404 })
  const headers = new Headers({
    'Content-Type': 'video/mp4',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges, ETag',
    'Accept-Ranges': 'bytes',
    'ETag': `"${item.sha256}"`,
    'X-Content-Type-Options': 'nosniff',
  })
  if (request.method === 'OPTIONS') {
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Range, If-Range, If-None-Match')
    headers.set('Access-Control-Max-Age', '86400')
    return new Response(null, { status: 204, headers })
  }
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } })
  const validator = request.headers.get('If-None-Match')
  if (validator === '*' || validator === headers.get('ETag')) return new Response(null, { status: 304, headers })
  if (request.method === 'HEAD') {
    headers.set('Content-Length', String(item.bytes))
    return new Response(null, { headers })
  }
  const ifRange = request.headers.get('If-Range')
  const rangeHeader = !ifRange || ifRange === headers.get('ETag') ? request.headers.get('Range') : null
  const range = rangeHeader ? parseRange(rangeHeader, item.bytes) : { start: 0, end: item.bytes - 1 }
  if (!range) {
    headers.set('Content-Range', `bytes */${item.bytes}`)
    return new Response(null, { status: 416, headers })
  }
  const length = range.end - range.start + 1
  const assetRequest = new Request(url.origin + url.pathname, { headers: { 'Accept-Encoding': 'identity' } })
  const cache = globalThis.caches?.default
  if (cache) {
    // The CDN cache serves ranges natively; never walk a large video's prefix in JS on a hit.
    const lookup = new Request(assetRequest.url, { headers: rangeHeader ? { Range: `bytes=${range.start}-${range.end}` } : {} })
    let cached = await cache.match(lookup)
    if (!cached) {
      const source = await env.ASSETS.fetch(assetRequest)
      if (source.status !== 200 || !source.body) return new Response('Asset unavailable', { status: 502 })
      const stored = new globalThis.FixedLengthStream(item.bytes)
      // Populate a complete immutable object without buffering or teeing it in memory.
      await Promise.all([
        source.body.pipeTo(stored.writable),
        cache.put(new Request(assetRequest.url), new Response(stored.readable, { headers })),
      ])
      cached = await cache.match(lookup)
    }
    if (cached) {
      const expectedStatus = rangeHeader ? 206 : 200
      if (cached.status === expectedStatus && Number(cached.headers.get('Content-Length')) === length) return cached
      await cached.body?.cancel()
    }
  }
  // The binding bypasses this handler and accesses only the uploaded asset itself.
  // Never forward the client's range/conditional headers to the asset-only server.
  const asset = await env.ASSETS.fetch(assetRequest)
  if (asset.status !== 200 || !asset.body) return new Response('Asset unavailable', { status: 502 })
  if (rangeHeader) headers.set('Content-Range', `bytes ${range.start}-${range.end}/${item.bytes}`)
  // Cloudflare derives Content-Length from this stream and enforces its byte count.
  const fixed = new globalThis.FixedLengthStream(length)
  // Whole-file requests can use the runtime's native stream pump without JS chunk slicing.
  const body = range.start === 0 && range.end === item.bytes - 1
    ? asset.body
    : sliceStream(asset.body, range.start, range.end)
  context.waitUntil(body.pipeTo(fixed.writable).catch(() => {}))
  return new Response(fixed.readable, { status: rangeHeader ? 206 : 200, headers })
}
