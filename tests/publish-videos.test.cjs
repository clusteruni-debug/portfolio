const test = require('node:test')
const assert = require('node:assert/strict')
const { assertApproved, assertBlobUrl, assertPlaybackUrl, assertStorage, getDelivery } = require('../scripts/publish-videos.cjs')
const sourceHash = 'a'.repeat(64)
const compressedHash = 'b'.repeat(64)
const original = { id: 'film', sourceFile: 'a/final.mp4', sha256: sourceHash, bytes: 1000, width: 854, height: 480 }
const derivative = { ...original, webDelivery: { sourceSha256: sourceHash, sha256: compressedHash, bytes: 400, width: 854, height: 480, frames: 360, ssim: .99, profile: 'h264-crf21-slow-v1' } }

test('compressed delivery still requires the approved source final', () => {
  const selection = { sourceFile: original.sourceFile, approvedSha256: sourceHash }
  assertApproved(derivative, selection, sourceHash)
  assert.throws(() => assertApproved(derivative, selection, compressedHash))
  assert.equal(getDelivery(derivative).sha256, compressedHash)
  assert.equal(getDelivery(original).sha256, sourceHash)
})

test('URL identifies the delivered bytes, and stale source URLs fail', () => {
  assertBlobUrl(`https://test.public.blob.vercel-storage.com/works/film/${compressedHash}.mp4`, derivative)
  assert.throws(() => assertBlobUrl(`https://test.public.blob.vercel-storage.com/works/film/${sourceHash}.mp4`, derivative))
  assert.throws(() => assertBlobUrl(`https://untrusted.example/works/film/${compressedHash}.mp4`, derivative))
})

test('rejects derivative metadata for another final, poor quality, or changed dimensions', () => {
  for (const patch of [{ sourceSha256: 'c'.repeat(64) }, { sha256: '../bad' }, { ssim: .97 }, { bytes: 950 }, { width: 640 }, { frames: 0 }, { profile: 'unknown' }]) {
    assert.throws(() => getDelivery({ ...derivative, webDelivery: { ...derivative.webDelivery, ...patch } }))
  }
})

test('active storage pins the exact origin and delivery hash for either provider', () => {
  for (const storage of [
    { version: 1, provider: 'vercel-blob', publicOrigin: 'https://test.public.blob.vercel-storage.com' },
    { version: 1, provider: 'r2', publicOrigin: 'https://videos.example.com' },
    { version: 1, provider: 'workers-static', publicOrigin: 'https://portfolio-videos.clusteruni.workers.dev' },
  ]) {
    assertPlaybackUrl(`${storage.publicOrigin}/works/film/${compressedHash}.mp4`, derivative, storage)
    assert.throws(() => assertPlaybackUrl(`https://different.example.com/works/film/${compressedHash}.mp4`, derivative, storage))
    assert.throws(() => assertPlaybackUrl(`${storage.publicOrigin}/works/film/${sourceHash}.mp4`, derivative, storage))
    assert.throws(() => assertPlaybackUrl(`${storage.publicOrigin}/works/film/${compressedHash}.mp4?token=secret`, derivative, storage))
  }
})

test('tuned profiles preserve the approved source and resolve distinct delivery paths', () => {
  for (const [profile, suffix] of [['h264-crf22-slow-v1', 'crf22-slow'], ['h264-crf23-veryslow-v1', 'crf23-veryslow']]) {
    const delivery = getDelivery({ ...derivative, webDelivery: { ...derivative.webDelivery, profile } })
    assert(delivery.filename.endsWith(`${sourceHash}-${suffix}.mp4`))
    assert.equal(delivery.sourceSha256, sourceHash)
    assert.throws(() => getDelivery({ ...derivative, webDelivery: { ...derivative.webDelivery, profile, ssim: .979 } }))
  }
})

test('Workers activation rejects lookalike and arbitrary origins', () => {
  for (const publicOrigin of ['https://clusteruni.workers.dev', 'https://film.clusteruni.workers.dev.evil.example', 'https://videos.example.com', 'https://pub-a.r2.dev']) {
    assert.throws(() => assertStorage({ version: 1, provider: 'workers-static', publicOrigin }))
  }
})

test('R2 activation rejects development, S3 API, local and noncanonical origins', () => {
  for (const publicOrigin of ['http://videos.example.com', 'https://pub-abc.r2.dev', 'https://abc.r2.cloudflarestorage.com', 'https://localhost', 'https://127.0.0.1', 'https://videos.example.com/path', 'https://user:secret@videos.example.com', 'https://videos.example.com:8443']) {
    assert.throws(() => assertStorage({ version: 1, provider: 'r2', publicOrigin }))
  }
})
