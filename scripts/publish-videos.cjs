/* Explicitly approved media only. Dry-run by default; never scans production folders. */
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { createReadStream } = require('node:fs')
const fs = require('node:fs/promises')
const path = require('node:path')
const { execFile } = require('node:child_process')
const { promisify } = require('node:util')
const runFile = promisify(execFile)
const root = path.resolve(__dirname, '..')
const storageConfig = require('../src/data/video-storage.json')
const DELIVERY_PROFILES = Object.freeze({
  'h264-crf21-slow-v1': 'crf21',
  'h264-crf22-slow-v1': 'crf22-slow',
  'h264-crf23-veryslow-v1': 'crf23-veryslow',
})

function assertApproved(video, selection, digest) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(video.id), 'Invalid work ID')
  assert(selection && selection.sourceFile === video.sourceFile, `Selection differs: ${video.id}`)
  assert(/^[a-f0-9]{64}$/.test(digest), `Invalid digest: ${video.id}`)
  assert.equal(selection.approvedSha256, digest, `Final-file approval missing or stale: ${video.id}`)
  assert.equal(video.sha256, digest, `Catalog differs from approved file: ${video.id}`)
}

function getDelivery(video) {
  const delivery = video.webDelivery
  if (!delivery) return { sha256: video.sha256, bytes: video.bytes, filename: path.join(root, 'public/videos/media', `${video.id}.mp4`) }
  assert.equal(delivery.sourceSha256, video.sha256, `Derivative belongs to a different final cut: ${video.id}`)
  assert(Object.hasOwn(DELIVERY_PROFILES, delivery.profile), `Unknown delivery profile: ${video.id}`)
  assert(/^[a-f0-9]{64}$/.test(delivery.sha256), 'Invalid derivative hash')
  assert(Number.isSafeInteger(delivery.bytes) && delivery.bytes > 32 && delivery.bytes < video.bytes * 0.90, 'Derivative must save at least ten percent')
  assert(typeof delivery.ssim === 'number' && delivery.ssim >= 0.98 && delivery.ssim <= 1, 'Derivative quality check is missing or below threshold')
  assert.equal(delivery.width, video.width, 'Derivative width changed')
  assert.equal(delivery.height, video.height, 'Derivative height changed')
  assert(Number.isSafeInteger(delivery.frames) && delivery.frames > 0, 'Missing derivative frame check')
  return { ...delivery, filename: path.join(root, 'tmp/video-delivery', video.id, `${video.sha256}-${DELIVERY_PROFILES[delivery.profile]}.mp4`) }
}

function assertBlobUrl(url, video) {
  const parsed = new URL(url)
  assert(parsed.protocol === 'https:' && /^[a-z0-9]+\.public\.blob\.vercel-storage\.com$/.test(parsed.hostname), 'Expected a public Vercel Blob URL')
  assert(!parsed.username && !parsed.password && !parsed.search && !parsed.hash, 'Unexpected URL credentials or parameters')
  assert.equal(decodeURIComponent(parsed.pathname), `/works/${video.id}/${getDelivery(video).sha256}.mp4`, 'Media URL must identify the exact verified delivery bytes')
}

function assertStorage(storage) {
  assert.equal(storage.version, 1, 'Unknown storage configuration version')
  assert(['vercel-blob', 'r2', 'workers-static'].includes(storage.provider), 'Unknown video storage provider')
  const origin = new URL(storage.publicOrigin)
  assert.equal(storage.publicOrigin, origin.origin, 'Storage must be a canonical origin without a path, credentials or parameters')
  assert.equal(origin.protocol, 'https:', 'Video delivery requires HTTPS')
  assert(!origin.port && /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(origin.hostname), 'Expected a public DNS hostname')
  if (storage.provider === 'vercel-blob') {
    assert(/^[a-z0-9]+\.public\.blob\.vercel-storage\.com$/.test(origin.hostname), 'Expected the configured Blob origin')
  } else if (storage.provider === 'workers-static') {
    assert(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.workers\.dev$/.test(origin.hostname), 'Expected the approved Workers service origin')
  } else {
    assert(!/(?:^|\.)(?:r2\.dev|cloudflarestorage\.com|vercel-storage\.com|localhost|local|test|invalid)$/.test(origin.hostname), 'R2 production delivery requires the approved public custom domain')
  }
}

function assertPlaybackUrl(url, video, storage = storageConfig) {
  assertStorage(storage)
  const parsed = new URL(url)
  assert.equal(parsed.origin, storage.publicOrigin, 'Media URL is outside the configured storage origin')
  assert(!parsed.username && !parsed.password && !parsed.search && !parsed.hash, 'Unexpected URL credentials or parameters')
  assert.equal(parsed.pathname, `/works/${video.id}/${getDelivery(video).sha256}.mp4`, 'Media URL must identify the verified delivery bytes')
}

async function checkRemote(video, storage = storageConfig, fetcher = fetch) {
  const delivery = getDelivery(video)
  assertPlaybackUrl(video.playbackUrl, video, storage)
  assert.equal(video.publishedSha256, delivery.sha256, `Unpublished final cut: ${video.id}`)
  const head = await fetcher(video.playbackUrl, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(30000) })
  assert(head.ok && /^video\/mp4(?:;|$)/.test(head.headers.get('content-type') || ''), `Invalid remote media: ${video.id}`)
  assert.equal(Number(head.headers.get('content-length')), delivery.bytes, `Remote size differs: ${video.id}`)
  const range = await fetcher(video.playbackUrl, { headers: { Range: 'bytes=0-31' }, redirect: 'error', signal: AbortSignal.timeout(30000) })
  assert.equal(range.status, 206, `Byte-range playback unavailable: ${video.id}`)
  assert.equal(range.headers.get('content-range'), `bytes 0-31/${delivery.bytes}`)
  assert.equal((await range.arrayBuffer()).byteLength, 32)
}

async function digestFile(filename) {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(filename)) hash.update(chunk)
  return hash.digest('hex')
}

async function main() {
  const flags = process.argv.slice(2)
  assert(flags.every((flag) => ['--upload', '--check'].includes(flag)), 'Use no flags for dry-run, --check for public media checks, or --upload after publication approval')
  assert(flags.length <= 1, 'Choose one mode')
  const catalogPath = path.join(root, 'src/data/videos.json')
  const videos = JSON.parse(await fs.readFile(catalogPath, 'utf8'))
  const selection = JSON.parse(await fs.readFile(path.join(root, 'src/data/video-selection.json'), 'utf8'))
  assert.equal(new Set(videos.map((video) => video.id)).size, videos.length, 'Duplicate catalog IDs')
  assert.equal(new Set(selection.map((video) => video.id)).size, selection.length, 'Duplicate selection IDs')
  assert.deepEqual(videos.map((video) => video.id).sort(), selection.map((video) => video.id).sort(), 'Catalog must match the explicit selection')
  const selected = new Map(selection.map((video) => [video.id, video]))
  // Validate the complete batch before any network upload or catalog mutation.
  for (const video of videos) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(video.id), 'Invalid work ID')
    const filename = path.join(root, 'public/videos/media', `${video.id}.mp4`)
    assertApproved(video, selected.get(video.id), await digestFile(filename))
    assert.equal((await fs.stat(filename)).size, video.bytes, `Media size differs: ${video.id}`)
    const delivery = getDelivery(video)
    if (video.webDelivery) {
      assert.equal(await digestFile(delivery.filename), delivery.sha256, `Derivative bytes changed: ${video.id}`)
      assert.equal((await fs.stat(delivery.filename)).size, delivery.bytes, `Derivative size differs: ${video.id}`)
    }
  }
  if (!flags.length) {
    console.log(JSON.stringify({ mode: 'dry-run', approved: videos.length, sourceBytes: videos.reduce((sum, video) => sum + video.bytes, 0), bytes: videos.reduce((sum, video) => sum + getDelivery(video).bytes, 0), needUpload: videos.filter((video) => !video.playbackUrl || video.publishedSha256 !== getDelivery(video).sha256).length }))
    return
  }
  if (flags[0] === '--upload') {
    assert.equal(storageConfig.provider, 'vercel-blob', 'Use the active provider publication workflow in docs/videos.md')
    assert(process.env.BLOB_READ_WRITE_TOKEN, 'Provide the approved store token through the process environment; do not edit .env files')
    const cli = process.env.VERCEL_CLI_PATH || (process.env.APPDATA && path.join(process.env.APPDATA, 'npm/node_modules/vercel/dist/index.js'))
    assert(cli, 'Set VERCEL_CLI_PATH to the installed Vercel CLI JavaScript entry point')
    await fs.access(cli)
    for (const video of videos) {
      const delivery = getDelivery(video)
      if (video.playbackUrl && video.publishedSha256 === delivery.sha256) {
        await checkRemote(video)
        console.log(`Verified existing: ${video.id}`)
        continue
      }
      const filename = delivery.filename
      let output
      try {
        const result = await runFile(process.execPath, [cli, 'blob', 'put', filename, '--pathname', `works/${video.id}/${delivery.sha256}.mp4`, '--access', 'public', '--content-type', 'video/mp4', '--cache-control-max-age', '31536000', '--no-color', '--non-interactive'], { cwd: root, env: process.env, windowsHide: true, timeout: 300000, maxBuffer: 1024 * 1024 })
        output = result.stdout + result.stderr
      } catch {
        // Do not print child output or arguments: operator credentials stay in memory.
        throw new Error(`Upload failed for ${video.id}; the catalog URL was not changed`)
      }
      const match = output.match(/https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/[^\s\x1b]+/)
      assert(match, `Upload did not return a public URL: ${video.id}`)
      const published = { ...video, playbackUrl: match[0], publishedSha256: delivery.sha256 }
      await checkRemote(published)
      Object.assign(video, published)
      await fs.writeFile(catalogPath, JSON.stringify(videos, null, 2) + '\n')
      console.log(`Published: ${video.id}`)
    }
  } else {
    for (const video of videos) await checkRemote(video)
  }
  console.log(JSON.stringify({ mode: flags[0].slice(2), verified: videos.length }))
}

module.exports = { assertApproved, assertBlobUrl, assertStorage, assertPlaybackUrl, checkRemote, digestFile, getDelivery }
if (require.main === module) main().catch((error) => { console.error(error.message); process.exitCode = 1 })
