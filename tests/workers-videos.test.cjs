const test = require('node:test')
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const fs = require('node:fs/promises')
const path = require('node:path')
const { fittedCandidates, assertAssetLimits } = require('../scripts/migrate-videos-to-workers.cjs')
const { publicationPlan, candidateVideo, stagePayload, verifyRemoteDelivery } = require('../scripts/migrate-videos-to-r2.cjs')
const sourceHash = 'a'.repeat(64)
const outputHash = 'b'.repeat(64)
const works = ['eunseol-dance', 'delivery'].map((id) => ({ id, sha256: sourceHash, bytes: 4000, width: 720, height: 1280, duration: 30, sourceFile: `${id}/final.mp4`, title: id }))
const fit = { works: works.map((video) => ({ id: video.id, sourceSha256: sourceHash, sourceFile: video.sourceFile, sha256: outputHash, bytes: 1000, width: 720, height: 1280, frames: 720, duration: 30, ssim: .99, crf: 22, preset: 'slow', audioCopied: true, timingVerified: true })) }
const storage = { version: 1, provider: 'workers-static', publicOrigin: 'https://portfolio-videos.clusteruni.workers.dev' }

test('only the two proven fitted copies change delivery metadata, never final-cut identity', () => {
  const extra = { ...works[0], id: 'third', sourceFile: 'third/final.mp4' }
  const candidates = fittedCandidates([...works, extra], fit)
  assert.equal(candidates[2], extra)
  for (let i = 0; i < works.length; i++) {
    assert.deepEqual({ ...candidates[i], webDelivery: undefined }, { ...works[i], webDelivery: undefined })
    assert.equal(candidates[i].webDelivery.sha256, outputHash)
    const published = candidateVideo(candidates[i], storage)
    assert.equal(published.playbackUrl, `${storage.publicOrigin}/works/${works[i].id}/${outputHash}.mp4`)
  }
})

test('changed final cuts, missing audio proof, weak quality and unrelated reports are rejected', () => {
  for (const patch of [{ sourceSha256: 'c'.repeat(64) }, { sourceFile: 'other/take.mp4' }, { audioCopied: false }, { timingVerified: false }, { ssim: .97 }, { duration: 31 }, { width: 640 }, { bytes: 25 * 1024 * 1024 }, { crf: 28 }]) {
    assert.throws(() => fittedCandidates(works, { works: [{ ...fit.works[0], ...patch }, fit.works[1]] }))
  }
  assert.throws(() => fittedCandidates(works, { works: [fit.works[0]] }))
  assert.throws(() => fittedCandidates(works, { works: [fit.works[0], { ...fit.works[1], id: 'other' }] }))
})

test('asset-size gate checks originals and compressed copies at the byte boundary', () => {
  assertAssetLimits([{ id: 'film', bytes: 25 * 1024 * 1024 - 1 }])
  for (const bytes of [0, 32, 25 * 1024 * 1024, 25 * 1024 * 1024 + 1]) assert.throws(() => assertAssetLimits([{ id: 'film', bytes }]))
  assert.throws(() => assertAssetLimits([]))
})

test('upload payload includes exact MP4s and explicit headers, never evidence or credentials', async () => {
  const base = path.resolve(__dirname, '../tmp/video-workers-migration/tests')
  await fs.mkdir(base, { recursive: true })
  const directory = await fs.mkdtemp(path.join(base, 'payload-'))
  const content = Buffer.from('12345678'.repeat(8))
  const digest = createHash('sha256').update(content).digest('hex')
  await fs.writeFile(path.join(directory, 'source.mp4'), content)
  const plan = [{ key: `works/film/${digest}.mp4`, sha256: digest, bytes: content.length, localFile: 'source.mp4' }]
  const headers = { _headers: '/works/*\n  Access-Control-Allow-Origin: *\n' }
  const payload = path.join(directory, 'upload')
  await stagePayload(payload, plan, directory, headers)
  await stagePayload(payload, plan, directory, headers)
  assert.deepEqual((await fs.readdir(payload)).sort(), ['_headers', 'works'])
  await assert.rejects(() => stagePayload(payload, plan, directory, { '.env': 'secret' }))
  await fs.writeFile(path.join(payload, '_headers'), 'changed')
  await assert.rejects(() => stagePayload(payload, plan, directory, headers), /Staged bytes differ/)
})

test('Workers proof requires actual hash, range and public cache/CORS behavior', async () => {
  const body = Buffer.from('abcdef00'.repeat(8))
  const digest = createHash('sha256').update(body).digest('hex')
  const video = { ...works[0], sha256: digest, bytes: body.length }
  const selected = [{ id: video.id, sourceFile: video.sourceFile, approvedSha256: digest }]
  assertAssetLimits(publicationPlan([video], selected))
  const candidate = candidateVideo(video, storage)
  const remote = (cors = '*') => async (_url, options = {}) => {
    if (options.method === 'HEAD') return new Response(null, { headers: { 'content-type': 'video/mp4', 'content-length': String(body.length) } })
    if (options.headers?.Range) return new Response(body.subarray(0, 32), { status: 206, headers: { 'content-range': `bytes 0-31/${body.length}` } })
    return new Response(body, { headers: { 'access-control-allow-origin': cors, 'cache-control': 'public, max-age=31536000, immutable' } })
  }
  const proof = await verifyRemoteDelivery(candidate, storage, remote())
  assert.equal(proof.sha256, digest)
  await assert.rejects(() => verifyRemoteDelivery(candidate, storage, remote('https://other.example')), /CORS/)
})

test('byte-range parsing handles bounded, open, suffix and unsatisfiable requests', async () => {
  const { parseRange } = await import('../cloudflare/videos/worker.mjs')
  for (const [value, expected] of [['bytes=0-31', { start: 0, end: 31 }], ['bytes=77-', { start: 77, end: 99 }], ['bytes=-10', { start: 90, end: 99 }], ['bytes=80-300', { start: 80, end: 99 }], ['bytes=-300', { start: 0, end: 99 }]]) assert.deepEqual(parseRange(value, 100), expected)
  for (const value of ['bytes=100-', 'bytes=30-10', 'bytes=-0', 'bytes=-', 'bytes=0-1,3-4', 'bytes=9007199254740992-', 'bogus']) assert.equal(parseRange(value, 100), null)
})

test('streamed ranges match bytes across chunk boundaries and cancel the remaining source', async () => {
  const { sliceStream } = await import('../cloudflare/videos/worker.mjs')
  const bytes = Uint8Array.from({ length: 257 }, (_, i) => i % 251)
  for (const [start, end] of [[0, 31], [50, 155], [256, 256], [0, 256]]) {
    let cursor = 0, cancelled = false
    const source = new ReadableStream({
      pull(controller) { if (cursor === bytes.length) { controller.close(); return }; controller.enqueue(bytes.subarray(cursor, Math.min(cursor + 13, bytes.length))); cursor = Math.min(cursor + 13, bytes.length) },
      cancel() { cancelled = true },
    })
    const received = new Uint8Array(await new Response(sliceStream(source, start, end)).arrayBuffer())
    assert.deepEqual(received, bytes.subarray(start, end + 1))
    if (end < bytes.length - 20) assert(cancelled, 'Do not drain unrelated remaining video bytes')
  }
  const short = new Response(new Uint8Array(3)).body
  await assert.rejects(() => new Response(sliceStream(short, 0, 9)).arrayBuffer(), /ended before/)
})

test('Worker exposes only manifest media and serves HEAD without downloading video', async () => {
  const { serveVideo } = await import('../cloudflare/videos/worker.mjs')
  const key = `/works/film/${sourceHash}.mp4`
  const assets = { [key]: { bytes: 1000, sha256: sourceHash } }
  const env = { ASSETS: { fetch() { throw new Error('HEAD must not download video') } } }
  const response = await serveVideo(new Request(storage.publicOrigin + key, { method: 'HEAD' }), env, {}, assets)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-length'), '1000')
  assert.equal(response.headers.get('accept-ranges'), 'bytes')
  for (const pathname of ['/manifest.json', '/.env', '/_headers', '/works/unapproved.mp4']) assert.equal((await serveVideo(new Request(storage.publicOrigin + pathname), env, {}, assets)).status, 404)
  assert.equal((await serveVideo(new Request(storage.publicOrigin + key, { method: 'POST' }), env, {}, assets)).status, 405)
})
