const test = require('node:test')
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { validatePlan, parseInventory, assertInventory } = require('../scripts/cleanup-video-copies.cjs')
// Synthetic data keeps safety tests independent of ignored audit files and future catalog edits.
function fixture() {
  const digest = (value) => createHash('sha256').update(value).digest('hex')
  const url = (id, hash) => `https://litg6buf7wykmhtj.public.blob.vercel-storage.com/works/${id}/${hash}.mp4`
  const plan = { storeId: 'store_LitG6buF7WYKmHtJ', objects: [], deleteBytes: 388411505, activeDeliveryBytes: 206214333 }
  const videos = [], selection = [], before = []
  for (let i = 0; i < 26; i++) {
    const id = `work-${i}`
    const sha256 = digest(`${id}-source`)
    const bytes = i < 15 ? 24000000 : i === 15 ? 28411505 : i < 25 ? 5000000 : 10311779
    const video = { id, sha256, bytes, sourceFile: `${id}.mp4`, width: 1280, height: 720, playbackUrl: url(id, sha256), publishedSha256: sha256 }
    before.push({ ...video })
    selection.push({ id, sourceFile: video.sourceFile, approvedSha256: sha256 })
    if (i < 16) {
      const delivery = { sourceSha256: sha256, sha256: digest(`${id}-delivery`), bytes: i < 15 ? 9000000 : 15902554, width: 1280, height: 720, frames: 300, ssim: 0.99, profile: 'h264-crf21-slow-v1' }
      video.webDelivery = delivery
      video.playbackUrl = url(id, delivery.sha256)
      video.publishedSha256 = delivery.sha256
      plan.objects.push({ id, oldUrl: url(id, sha256), oldSha256: sha256, oldBytes: bytes, newUrl: video.playbackUrl, newSha256: delivery.sha256, newBytes: delivery.bytes })
    }
    videos.push(video)
  }
  return [plan, videos, selection, before]
}

test('the retirement batch covers only 16 replaced copies and protects all 26 active files', () => {
  const active = validatePlan(...fixture())
  assert.equal(active.length, 26)
  assert.equal(active.reduce((sum, item) => sum + item.bytes, 0), 206214333)
})

test('an active URL can never become a deletion target', () => {
  const args = fixture()
  args[0].objects[0].oldUrl = args[0].objects[0].newUrl
  assert.throws(() => validatePlan(...args), /Refusing to delete active media/)
})

test('wrong store, changed batch and stale replacement stop cleanup', () => {
  for (const mutate of [
    (args) => { args[0].storeId = 'another-store' },
    (args) => { args[0].objects.pop() },
    (args) => { args[0].objects[0].newUrl = args[0].objects[1].newUrl },
    (args) => { args[0].objects[0].oldSha256 = '0'.repeat(64) },
    (args) => { args[2][0].approvedSha256 = '0'.repeat(64) },
  ]) {
    const args = fixture()
    mutate(args)
    assert.throws(() => validatePlan(...args))
  }
})

test('missing, extra, changed or duplicated inventory rows are rejected', () => {
  const active = validatePlan(...fixture())
  assertInventory(active, active)
  assert.throws(() => assertInventory(active.slice(1), active))
  assert.throws(() => assertInventory([...active, { url: 'https://example.com/unrelated', bytes: 1 }], active))
  assert.throws(() => assertInventory([{ ...active[0], bytes: 1 }, ...active.slice(1)], active))
  const one = active[0]
  const row = `  35m  ${one.bytes}  ${new URL(one.url).pathname.slice(1)}  ${one.url}`
  assert.equal(parseInventory(`Fetching blobs\nUploaded At Size Pathname URL\n${row}`).length, 1)
  assert.throws(() => parseInventory(`${row}\n${row}`), /Duplicate/)
  assert.throws(() => parseInventory(`${row}\nunrecognized continuation`), /Unrecognized/)
  assert.throws(() => parseInventory(row.replace('https://litg6buf7wykmhtj', 'https://other')), /Unexpected/)
})
