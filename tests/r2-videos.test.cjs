const test = require('node:test')
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const fs = require('node:fs/promises')
const path = require('node:path')
const { applyFitReport, publicationPlan, candidateVideo, verifyRemoteDelivery, stagePayload } = require('../scripts/migrate-videos-to-r2.cjs')
const content = Buffer.from('12345678'.repeat(8))
const sha256 = createHash('sha256').update(content).digest('hex')
const video = { id: 'film', sourceFile: 'approved/final.mp4', sha256, bytes: content.length, width: 720, height: 1280, title: 'Approved work' }
const selection = { id: video.id, sourceFile: video.sourceFile, approvedSha256: sha256 }
const storage = { version: 1, provider: 'r2', publicOrigin: 'https://videos.example.com' }

test('two fitted deliveries retain final cuts and reject stale or incomplete proof', () => {
  const films = ['delivery', 'eunseol-dance'].map((id) => ({ ...video, id, bytes: 1000, duration: 10 }))
  const report = { works: films.map((film) => ({ id: film.id, sourceFile: film.sourceFile, sourceSha256: film.sha256,
    sha256: 'a'.repeat(64), bytes: 800, width: 720, height: 1280, duration: 10, frames: 300, ssim: .99,
    crf: 22, preset: 'slow', audioCopied: true, timingVerified: true })) }
  const prepared = applyFitReport([...films, video], report)
  for (let i = 0; i < films.length; i++) {
    assert.deepEqual({ ...prepared[i], webDelivery: undefined }, { ...films[i], webDelivery: undefined })
    assert.equal(prepared[i].webDelivery.bytes, 800)
    assert.equal(films[i].webDelivery, undefined)
  }
  assert.equal(prepared[2], video)
  for (const patch of [{ sourceSha256: 'b'.repeat(64) }, { sourceFile: 'another.mp4' }, { audioCopied: false }, { timingVerified: false }, { duration: 11 }, { ssim: .9 }, { width: 1920 }, { crf: 99 }]) {
    assert.throws(() => applyFitReport(films, { works: [{ ...report.works[0], ...patch }, report.works[1]] }))
  }
  assert.throws(() => applyFitReport(films, { works: [report.works[0]] }))
  assert.throws(() => applyFitReport(films, { works: [report.works[0], report.works[0]] }))
})

test('manifest requires exact approved selection and content-addressed object keys', () => {
  const [item] = publicationPlan([video], [selection])
  assert.equal(item.key, `works/film/${sha256}.mp4`)
  assert.equal(item.bytes, content.length)
  assert.throws(() => publicationPlan([video], []))
  assert.throws(() => publicationPlan([video, video], [selection, selection]))
  assert.throws(() => publicationPlan([video], [{ ...selection, approvedSha256: '0'.repeat(64) }]))
})

test('migration changes only publication URL/hash and retains original work metadata', () => {
  const candidate = candidateVideo(video, storage)
  assert.deepEqual({ ...candidate, playbackUrl: undefined, publishedSha256: undefined }, { ...video, playbackUrl: undefined, publishedSha256: undefined })
  assert.equal(candidate.playbackUrl, `${storage.publicOrigin}/works/film/${sha256}.mp4`)
  assert.equal(candidate.publishedSha256, sha256)
  assert.equal(video.playbackUrl, undefined)
})

function remote(body = content, rangeStatus = 206) {
  return async (_url, options = {}) => {
    if (options.method === 'HEAD') return new Response(null, { status: 200, headers: { 'content-type': 'video/mp4', 'content-length': String(content.length) } })
    if (options.headers?.Range) return new Response(content.subarray(0, 32), { status: rangeStatus, headers: { 'content-range': `bytes 0-31/${content.length}` } })
    return new Response(body, { status: 200 })
  }
}

test('R2 proof verifies complete bytes and range support, not just name or size', async () => {
  const candidate = candidateVideo(video, storage)
  const proof = await verifyRemoteDelivery(candidate, storage, remote())
  assert.equal(proof.sha256, sha256)
  await assert.rejects(() => verifyRemoteDelivery(candidate, storage, remote(Buffer.alloc(content.length))), /hash differs/)
  await assert.rejects(() => verifyRemoteDelivery(candidate, storage, remote(content.subarray(1))), /length differs/)
  await assert.rejects(() => verifyRemoteDelivery(candidate, storage, remote(content, 200)), /Byte-range playback unavailable/)
})

test('staging refuses extra old takes or changed bytes instead of silently uploading them', async () => {
  const evidence = path.resolve(__dirname, '../tmp/video-r2-migration/tests')
  await fs.mkdir(evidence, { recursive: true })
  const directory = await fs.mkdtemp(path.join(evidence, 'payload-'))
  await fs.writeFile(path.join(directory, 'source.mp4'), content)
  const plan = [{ key: `works/film/${sha256}.mp4`, sha256, bytes: content.length, localFile: 'source.mp4' }]
  const payload = path.join(directory, 'upload')
  await stagePayload(payload, plan, directory)
  await stagePayload(payload, plan, directory)
  await fs.writeFile(path.join(payload, 'extra-take.mp4'), content)
  await assert.rejects(() => stagePayload(payload, plan, directory), /Unexpected staged file/)
  const corrupt = path.join(directory, 'corrupt')
  await fs.mkdir(path.join(corrupt, 'works/film'), { recursive: true })
  await fs.writeFile(path.join(corrupt, plan[0].key), Buffer.alloc(content.length))
  await assert.rejects(() => stagePayload(corrupt, plan, directory), /Staged bytes differ/)
})
