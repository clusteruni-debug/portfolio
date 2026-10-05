/* Prepare exact approved files; verify every public R2 object before changing local publication. */
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { constants } = require('node:fs')
const fs = require('node:fs/promises')
const path = require('node:path')
const { assertApproved, assertStorage, assertPlaybackUrl, checkRemote, digestFile, getDelivery } = require('./publish-videos.cjs')
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'tmp/video-r2-migration')
const CATALOG = path.join(ROOT, 'src/data/videos.json')
const STORAGE = path.join(ROOT, 'src/data/video-storage.json')
const SELECTION = path.join(ROOT, 'src/data/video-selection.json')
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex')

function applyFitReport(videos, report) {
  assert.deepEqual(report.works.map((row) => row.id).sort(), ['delivery', 'eunseol-dance'], 'Fit report must identify exactly the two approved works')
  const replacements = new Map(report.works.map((row) => [row.id, row]))
  for (const id of replacements.keys()) assert(videos.some((video) => video.id === id), 'Fitted work is not selected')
  return videos.map((video) => {
    const row = replacements.get(video.id)
    if (!row) return video
    assert.equal(row.sourceSha256, video.sha256, 'Fitted copy belongs to a different final cut')
    assert.equal(row.sourceFile, video.sourceFile, 'Fitted source path changed')
    assert(row.audioCopied === true && row.timingVerified === true, 'Audio and frame timing proof required')
    assert(Math.abs(row.duration - video.duration) < .05, 'Fitted duration changed')
    const next = { ...video, webDelivery: {
      ...Object.fromEntries(['sourceSha256', 'sha256', 'bytes', 'width', 'height', 'frames', 'ssim'].map((key) => [key, row[key]])),
      profile: `h264-crf${row.crf}-${row.preset}-v1`,
    } }
    getDelivery(next)
    return next
  })
}

function publicationPlan(videos, selection) {
  assert(videos.length > 0, 'Cannot publish an empty selection')
  for (const rows of [videos, selection]) assert.equal(new Set(rows.map((row) => row.id)).size, rows.length, 'Duplicate selected IDs')
  assert.deepEqual(videos.map((v) => v.id).sort(), selection.map((v) => v.id).sort(), 'Catalog must match the explicit final-file selection')
  return videos.map((video) => {
    assertApproved(video, selection.find((item) => item.id === video.id), video.sha256)
    const delivery = getDelivery(video)
    const localFile = path.relative(ROOT, delivery.filename).replaceAll('\\', '/')
    assert(!localFile.startsWith('..') && !path.isAbsolute(localFile), 'Delivery must be inside this project')
    return { id: video.id, sourceFile: video.sourceFile, sourceSha256: video.sha256, sha256: delivery.sha256,
      bytes: delivery.bytes, key: `works/${video.id}/${delivery.sha256}.mp4`, localFile, previousUrl: video.playbackUrl || null }
  })
}

function candidateVideo(video, storage) {
  assertStorage(storage)
  assert(['r2', 'workers-static'].includes(storage.provider), 'Expected a Cloudflare video origin')
  const delivery = getDelivery(video)
  const candidate = { ...video, playbackUrl: `${storage.publicOrigin}/works/${video.id}/${delivery.sha256}.mp4`, publishedSha256: delivery.sha256 }
  assertPlaybackUrl(candidate.playbackUrl, candidate, storage)
  return candidate
}

async function verifyRemoteDelivery(video, storage, fetcher = fetch) {
  await checkRemote(video, storage, fetcher)
  const delivery = getDelivery(video)
  const response = await fetcher(video.playbackUrl, { redirect: 'error', signal: AbortSignal.timeout(120000) })
  assert.equal(response.status, 200, `Full remote content unavailable: ${video.id}`)
  if (storage.provider === 'workers-static') {
    assert.equal(response.headers.get('access-control-allow-origin'), '*', 'Public video CORS header missing')
    assert(/max-age=31536000.*immutable/.test(response.headers.get('cache-control') || ''), 'Immutable delivery cache policy missing')
  }
  const hash = createHash('sha256')
  let bytes = 0
  for await (const chunk of response.body) { bytes += chunk.length; hash.update(chunk) }
  assert.equal(bytes, delivery.bytes, `Remote content length differs: ${video.id}`)
  assert.equal(hash.digest('hex'), delivery.sha256, `Remote content hash differs: ${video.id}`)
  return { id: video.id, url: video.playbackUrl, sha256: delivery.sha256, bytes, verifiedAt: new Date().toISOString() }
}

async function checkLocal(plan) {
  const sourceRoot = await fs.realpath(path.resolve(ROOT, '../ai-video-hustle/productions'))
  for (const item of plan) {
    const source = await fs.realpath(path.resolve(sourceRoot, item.sourceFile))
    const relative = path.relative(sourceRoot, source)
    assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Source outside production archive')
    assert.equal(await digestFile(source), item.sourceSha256, `Approved source changed: ${item.id}`)
    const local = path.join(ROOT, item.localFile)
    assert.equal(await digestFile(local), item.sha256, `Local delivery changed: ${item.id}`)
    assert.equal((await fs.stat(local)).size, item.bytes, `Local delivery size changed: ${item.id}`)
  }
}

async function saveSnapshot(filename, content) {
  try { await fs.writeFile(filename, content, { flag: 'wx' }) }
  catch (error) {
    if (error.code !== 'EEXIST') throw error
    assert.equal(sha(await fs.readFile(filename)), sha(content), 'An immutable local snapshot differs')
  }
}

async function stagePayload(directory, plan, sourceRoot = ROOT, controlFiles = {}) {
  const expected = new Map(plan.map((item) => [item.key, item]))
  assert.equal(expected.size, plan.length, 'Duplicate staged object keys')
  for (const key of expected.keys()) assert(/^works\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-f0-9]{64}\.mp4$/.test(key), 'Invalid staged object key')
  for (const [key, content] of Object.entries(controlFiles)) {
    assert.equal(key, '_headers', 'Only explicit static-asset headers may accompany media')
    assert(typeof content === 'string' && content.length > 0, 'Missing asset header rules')
    expected.set(key, { sha256: sha(content) })
  }
  await fs.mkdir(directory, { recursive: true })
  async function inspect(folder, prefix = '') {
    const files = []
    for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
      const key = prefix + entry.name
      assert(!entry.isSymbolicLink(), 'Staged payload cannot contain symbolic links')
      if (entry.isDirectory()) {
        assert([...expected.keys()].some((item) => item.startsWith(key + '/')), `Unexpected staged folder: ${key}`)
        files.push(...await inspect(path.join(folder, entry.name), key + '/'))
      } else {
        assert(entry.isFile() && expected.has(key), `Unexpected staged file: ${key}`)
        assert.equal(await digestFile(path.join(folder, entry.name)), expected.get(key).sha256, `Staged bytes differ: ${key}`)
        files.push(key)
      }
    }
    return files
  }
  await inspect(directory)
  for (const item of plan) {
    const destination = path.join(directory, item.key)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    try { await fs.copyFile(path.join(sourceRoot, item.localFile), destination, constants.COPYFILE_EXCL) }
    catch (error) { if (error.code !== 'EEXIST') throw error }
  }
  for (const [key, content] of Object.entries(controlFiles)) await saveSnapshot(path.join(directory, key), content)
  assert.deepEqual((await inspect(directory)).sort(), [...expected.keys()].sort(), 'Staged payload must contain exactly the selected objects')
}

async function atomicWrite(filename, content) {
  const temporary = path.join(OUTPUT, `write-${path.basename(filename)}-${sha(content)}.json`)
  await saveSnapshot(temporary, content)
  await fs.rename(temporary, filename)
}

async function main() {
  const args = process.argv.slice(2)
  const mode = args[0] || '--prepare'
  assert(['--prepare', '--stage', '--verify', '--activate'].includes(mode), 'Choose --prepare, --stage, --verify or --activate')
  const needsOrigin = ['--verify', '--activate'].includes(mode)
  const options = new Map()
  for (let i = 1; i < args.length; i += 2) {
    assert(['--origin', '--fit-report'].includes(args[i]) && args[i + 1] && !args[i + 1].startsWith('--'), 'Use --origin <url> and/or --fit-report <local-report>')
    assert(!options.has(args[i]), 'Duplicate option')
    options.set(args[i], args[i + 1])
  }
  assert.equal(options.has('--origin'), needsOrigin, 'Only verification/activation requires --origin https://approved-video-domain')
  const storage = needsOrigin ? { version: 1, provider: 'r2', publicOrigin: options.get('--origin') } : null
  if (storage) assertStorage(storage)
  const initial = await Promise.all([CATALOG, STORAGE, SELECTION].map((filename) => fs.readFile(filename)))
  let videos = JSON.parse(initial[0].toString('utf8'))
  let fitBytes = null
  let fitPath = null
  if (options.has('--fit-report')) {
    fitPath = await fs.realpath(path.resolve(ROOT, options.get('--fit-report')))
    const relative = path.relative(await fs.realpath(path.join(ROOT, 'tmp')), fitPath)
    assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Fit report must be inside project tmp')
    fitBytes = await fs.readFile(fitPath)
    videos = applyFitReport(videos, JSON.parse(fitBytes.toString('utf8')))
  }
  const candidateBytes = Buffer.from(JSON.stringify(videos, null, 2) + '\n')
  const candidateSha256 = sha(candidateBytes)
  const selection = JSON.parse(initial[2].toString('utf8'))
  const plan = publicationPlan(videos, selection)
  await checkLocal(plan)
  await fs.mkdir(OUTPUT, { recursive: true })
  const unchanged = async () => {
    for (const [i, filename] of [CATALOG, STORAGE, SELECTION].entries()) assert.equal(sha(await fs.readFile(filename)), sha(initial[i]), 'Publication inputs changed; restage before activating')
    if (fitPath) assert.equal(sha(await fs.readFile(fitPath)), sha(fitBytes), 'Fit report changed during migration')
  }
  const payload = `tmp/video-r2-migration/payload-${candidateSha256}`
  const manifest = { version: 1, createdAt: new Date().toISOString(), catalogSha256: sha(initial[0]), storageSha256: sha(initial[1]), selectionSha256: sha(initial[2]), candidateSha256,
    candidateFile: `candidate-${candidateSha256}.json`, fitReportSha256: fitBytes ? sha(fitBytes) : null,
    payload, works: plan.length, bytes: plan.reduce((sum, item) => sum + item.bytes, 0), objects: plan }
  await fs.writeFile(path.join(OUTPUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  await saveSnapshot(path.join(OUTPUT, `catalog-${sha(initial[0])}.json`), initial[0])
  await saveSnapshot(path.join(OUTPUT, `storage-${sha(initial[1])}.json`), initial[1])
  await saveSnapshot(path.join(OUTPUT, manifest.candidateFile), candidateBytes)
  if (fitBytes) await saveSnapshot(path.join(OUTPUT, `fit-report-${sha(fitBytes)}.json`), fitBytes)
  if (mode === '--stage') {
    await stagePayload(path.join(ROOT, payload), plan)
  }
  if (!needsOrigin) {
    await unchanged()
    console.log(JSON.stringify({ mode, works: plan.length, bytes: manifest.bytes, catalogChanged: false, manifest: 'tmp/video-r2-migration/manifest.json', payload: mode === '--stage' ? `${payload}/works` : null }))
    return
  }
  const candidates = videos.map((video) => candidateVideo(video, storage))
  const verified = []
  for (let i = 0; i < candidates.length; i += 3) {
    verified.push(...await Promise.all(candidates.slice(i, i + 3).map(async (video) => {
      const proof = await verifyRemoteDelivery(video, storage)
      console.log(`Verified full bytes: ${video.id}`)
      return proof
    })))
  }
  await checkLocal(plan)
  await unchanged()
  const proof = { verifiedAt: new Date().toISOString(), storage, catalogSha256: sha(initial[0]), candidateSha256, fitReportSha256: manifest.fitReportSha256, works: verified.length, bytes: manifest.bytes, objects: verified }
  await fs.writeFile(path.join(OUTPUT, 'remote-proof.json'), JSON.stringify(proof, null, 2) + '\n')
  if (mode === '--activate') {
    const next = [JSON.stringify(candidates, null, 2) + '\n', JSON.stringify(storage, null, 2) + '\n']
    const targets = [CATALOG, STORAGE]
    try {
      for (let i = 0; i < targets.length; i++) await atomicWrite(targets[i], next[i])
    } catch (error) {
      // Restore only files still matching our old/new bytes; never overwrite a concurrent edit.
      for (let i = 0; i < targets.length; i++) {
        const digest = sha(await fs.readFile(targets[i]))
        assert(digest === sha(initial[i]) || digest === sha(next[i]), 'Concurrent edit detected during local rollback')
        await atomicWrite(targets[i], initial[i])
      }
      throw error
    }
    await fs.writeFile(path.join(OUTPUT, 'activation.json'), JSON.stringify({ ...proof, activatedLocallyAt: new Date().toISOString(), deployed: false }, null, 2) + '\n')
  }
  console.log(JSON.stringify({ mode, works: verified.length, bytes: manifest.bytes, origin: storage.publicOrigin, activatedLocally: mode === '--activate', deployed: false }))
}

if (require.main === module) main().catch((error) => { console.error(error.message); process.exitCode = 1 })
module.exports = { applyFitReport, publicationPlan, candidateVideo, verifyRemoteDelivery, stagePayload, checkLocal, saveSnapshot }
