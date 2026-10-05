/* Stage only selected final cuts. Activation requires complete public content proof. */
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { constants } = require('node:fs')
const fs = require('node:fs/promises')
const path = require('node:path')
const { getDelivery, digestFile, assertStorage } = require('./publish-videos.cjs')
const { publicationPlan, candidateVideo, verifyRemoteDelivery, stagePayload, checkLocal, saveSnapshot } = require('./migrate-videos-to-r2.cjs')
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'tmp/video-workers-migration')
const CATALOG = path.join(ROOT, 'src/data/videos.json')
const CONFIG = path.join(ROOT, 'cloudflare/videos/wrangler.jsonc')
const HEADERS = path.join(ROOT, 'cloudflare/videos/_headers')
const WORKER = path.join(ROOT, 'cloudflare/videos/worker.mjs')
const STORAGE = path.join(ROOT, 'src/data/video-storage.json')
const SELECTION = path.join(ROOT, 'src/data/video-selection.json')
const TARGET = Object.freeze({ version: 1, provider: 'workers-static', publicOrigin: 'https://portfolio-videos.clusteruni.workers.dev' })
const LIMIT = 25 * 1024 * 1024
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex')
const json = (value) => JSON.stringify(value, null, 2) + '\n'

function fittedCandidates(videos, report) {
  assert.deepEqual(report.works.map((row) => row.id).sort(), ['delivery', 'eunseol-dance'], 'Fit report must identify exactly the two approved works')
  const replacements = new Map(report.works.map((row) => [row.id, row]))
  for (const id of replacements.keys()) assert(videos.some((video) => video.id === id), 'Fitted work is not selected')
  return videos.map((video) => {
    const row = replacements.get(video.id)
    if (!row) return video
    assert.equal(row.sourceSha256, video.sha256, 'Fitted copy belongs to a different final cut')
    assert.equal(row.sourceFile, video.sourceFile, 'Fitted copy source path changed')
    assert(row.audioCopied === true && row.timingVerified === true, 'Audio and frame timing proof required')
    assert(Math.abs(row.duration - video.duration) < .05, 'Fitted duration changed')
    assert(row.bytes < LIMIT, 'Fitted asset must be below 25 MiB')
    const profile = `h264-crf${row.crf}-${row.preset}-v1`
    const next = { ...video, webDelivery: { ...Object.fromEntries(['sourceSha256', 'sha256', 'bytes', 'width', 'height', 'frames', 'ssim'].map((key) => [key, row[key]])), profile } }
    getDelivery(next) // Keep the publisher's source, quality and dimensions contract.
    return next
  })
}

function assertAssetLimits(plan) {
  assert(plan.length > 0 && plan.length <= 20000, 'Static-asset file count outside Free limits')
  for (const item of plan) assert(Number.isSafeInteger(item.bytes) && item.bytes > 32 && item.bytes < LIMIT, `Asset exceeds 25 MiB or has invalid size: ${item.id}`)
}

async function copyFitted(videos, report, reportPath) {
  const copies = []
  for (const row of report.works) {
    assert.equal(path.basename(row.file), row.file, 'Fit report requires a local basename')
    const source = await fs.realpath(path.join(path.dirname(reportPath), row.file))
    const relative = path.relative(await fs.realpath(path.dirname(reportPath)), source)
    assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Fitted file escapes report folder')
    assert.equal(await digestFile(source), row.sha256, 'Fitted bytes changed after quality checks')
    assert.equal((await fs.stat(source)).size, row.bytes, 'Fitted byte count changed')
    copies.push([source, getDelivery(videos.find((video) => video.id === row.id)).filename, row.sha256])
  }
  for (const [source, destination, expected] of copies) {
    await fs.mkdir(path.dirname(destination), { recursive: true })
    try { await fs.copyFile(source, destination, constants.COPYFILE_EXCL) }
    catch (error) { if (error.code !== 'EEXIST') throw error }
    assert.equal(await digestFile(destination), expected, 'Existing delivery copy differs; no overwrite allowed')
  }
}

async function currentInputs() { return Promise.all([CATALOG, STORAGE, SELECTION].map((filename) => fs.readFile(filename))) }

async function stage(reportArg) {
  const initial = await currentInputs()
  let videos = JSON.parse(initial[0])
  const selection = JSON.parse(initial[2])
  if (reportArg) {
    const reportPath = await fs.realpath(path.resolve(ROOT, reportArg))
    const relative = path.relative(await fs.realpath(path.join(ROOT, 'tmp')), reportPath)
    assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Fit report must be in project evidence directory')
    const fit = JSON.parse(await fs.readFile(reportPath, 'utf8'))
    videos = fittedCandidates(videos, fit)
    await copyFitted(videos, fit, reportPath)
  }
  const candidates = videos.map((video) => candidateVideo(video, TARGET))
  const plan = publicationPlan(candidates, selection)
  assertAssetLimits(plan)
  await checkLocal(plan)
  const candidateBytes = json(candidates)
  const candidateHash = sha(candidateBytes)
  const headers = await fs.readFile(HEADERS, 'utf8')
  const templateBytes = await fs.readFile(CONFIG)
  const workerBytes = await fs.readFile(WORKER)
  const bundleHash = sha(candidateBytes + headers + templateBytes.toString() + workerBytes.toString())
  const payloadName = `payload-${bundleHash}`
  await fs.mkdir(OUTPUT, { recursive: true })
  await stagePayload(path.join(OUTPUT, payloadName), plan, ROOT, { _headers: headers })
  const template = JSON.parse(templateBytes)
  assert.equal(template.name, 'portfolio-videos', 'Unexpected Worker target')
  assert.equal(template.account_id, 'a4cf85ab96bc624c4b65d1ad57776431', 'Unexpected Cloudflare account')
  assert(template.main === 'worker.mjs' && template.assets.binding === 'ASSETS' && template.assets.run_worker_first === true, 'Expected the verified byte-range Worker')
  assert.equal(template.cache?.enabled, true, 'Workers edge cache must be enabled')
  const entryFile = `entry-${bundleHash}.mjs`
  const assets = Object.fromEntries(plan.map((item) => ['/' + item.key, { bytes: item.bytes, sha256: item.sha256 }]))
  const entryBytes = `import { serveVideo } from '../../cloudflare/videos/worker.mjs'\nconst assets = ${JSON.stringify(assets)}\nexport default { fetch(request, env, context) { return serveVideo(request, env, context, assets) } }\n`
  const configBytes = json({ ...template, main: `./${entryFile}`, assets: { ...template.assets, directory: `./${payloadName}` } })
  for (const [i, label] of ['catalog', 'storage', 'selection'].entries()) await saveSnapshot(path.join(OUTPUT, `${label}-${sha(initial[i])}.json`), initial[i])
  await saveSnapshot(path.join(OUTPUT, `candidate-${candidateHash}.json`), candidateBytes)
  await saveSnapshot(path.join(OUTPUT, `wrangler-${bundleHash}.json`), configBytes)
  await saveSnapshot(path.join(OUTPUT, entryFile), entryBytes)
  for (const [i, bytes] of (await currentInputs()).entries()) assert.equal(sha(bytes), sha(initial[i]), 'Publication inputs changed during staging')
  const manifest = { version: 1, storage: TARGET, catalogSha256: sha(initial[0]), storageSha256: sha(initial[1]), selectionSha256: sha(initial[2]),
    candidateSha256: candidateHash, bundleHash, workerSha256: sha(workerBytes), entrySha256: sha(entryBytes), entryFile,
    headersSha256: sha(headers), configSha256: sha(configBytes), configFile: `wrangler-${bundleHash}.json`,
    payload: payloadName, works: plan.length, bytes: plan.reduce((sum, item) => sum + item.bytes, 0), objects: plan }
  await fs.writeFile(path.join(OUTPUT, 'manifest.json'), json(manifest))
  console.log(json({ mode: 'staged', works: plan.length, bytes: manifest.bytes, config: `tmp/video-workers-migration/${manifest.configFile}`, catalogChanged: false }))
}

async function loadStaged() {
  const manifest = JSON.parse(await fs.readFile(path.join(OUTPUT, 'manifest.json'), 'utf8'))
  assert.deepEqual(manifest.storage, TARGET, 'Unapproved Worker origin')
  assertStorage(TARGET)
  assert(/^[a-f0-9]{64}$/.test(manifest.candidateSha256), 'Invalid staged catalog hash')
  assert(/^[a-f0-9]{64}$/.test(manifest.bundleHash), 'Invalid staged bundle hash')
  assert.equal(manifest.configFile, `wrangler-${manifest.bundleHash}.json`, 'Unexpected staged config path')
  assert.equal(manifest.payload, `payload-${manifest.bundleHash}`, 'Unexpected staged payload path')
  assert.equal(manifest.entryFile, `entry-${manifest.bundleHash}.mjs`, 'Unexpected Worker entry path')
  assert.equal(await digestFile(WORKER), manifest.workerSha256, 'Worker implementation changed; restage')
  assert.equal(await digestFile(path.join(OUTPUT, manifest.entryFile)), manifest.entrySha256, 'Staged Worker manifest changed')
  const candidateBytes = await fs.readFile(path.join(OUTPUT, `candidate-${manifest.candidateSha256}.json`))
  assert.equal(sha(candidateBytes), manifest.candidateSha256, 'Staged catalog changed')
  assert.equal(await digestFile(path.join(OUTPUT, manifest.configFile)), manifest.configSha256, 'Deployment configuration changed')
  const candidates = JSON.parse(candidateBytes)
  const selection = JSON.parse(await fs.readFile(SELECTION, 'utf8'))
  const plan = publicationPlan(candidates, selection)
  assert.deepEqual(plan, manifest.objects, 'Staged object plan changed')
  assert.equal(plan.length, manifest.works)
  assert.equal(plan.reduce((sum, item) => sum + item.bytes, 0), manifest.bytes)
  assertAssetLimits(plan)
  await checkLocal(plan)
  const headers = await fs.readFile(HEADERS, 'utf8')
  assert.equal(sha(headers), manifest.headersSha256, 'Asset headers changed')
  await stagePayload(path.join(OUTPUT, manifest.payload), plan, ROOT, { _headers: headers })
  return { manifest, candidates, candidateBytes }
}

async function assertCurrent(manifest) {
  const current = (await currentInputs()).map(sha)
  assert.equal(current[2], manifest.selectionSha256, 'Final-cut selection changed after staging')
  const oldPair = current[0] === manifest.catalogSha256 && current[1] === manifest.storageSha256
  const newPair = current[0] === manifest.candidateSha256 && current[1] === sha(json(TARGET))
  assert(oldPair || newPair, 'Active catalog/storage changed; restage instead of overwriting concurrent work')
}

async function atomicWrite(filename, bytes) {
  const temporary = path.join(OUTPUT, `write-${path.basename(filename)}-${sha(bytes)}.json`)
  await saveSnapshot(temporary, bytes)
  await fs.rename(temporary, filename)
}

async function verify(activate) {
  console.log('Checking pinned local sources and deployment bundle')
  const { manifest, candidates, candidateBytes } = await loadStaged()
  await assertCurrent(manifest)
  console.log(`Checking ${candidates.length} public video files`)
  const verified = []
  for (let i = 0; i < candidates.length; i += 3) {
    verified.push(...await Promise.all(candidates.slice(i, i + 3).map(async (video) => {
      try {
        const result = await verifyRemoteDelivery(video, TARGET)
        console.log(`Verified ${video.id}: ${result.bytes} bytes`)
        return result
      }
      catch (error) { throw new Error(`${video.id}: ${error.message}`, { cause: error }) }
    })))
    console.log(`Verified public bytes: ${verified.length}/${candidates.length}`)
  }
  await checkLocal(manifest.objects)
  await assertCurrent(manifest)
  const proof = { verifiedAt: new Date().toISOString(), candidateSha256: manifest.candidateSha256, storage: TARGET, works: verified.length, bytes: manifest.bytes, objects: verified }
  await fs.writeFile(path.join(OUTPUT, 'remote-proof.json'), json(proof))
  if (activate) {
    const initial = await currentInputs()
    const next = [candidateBytes, Buffer.from(json(TARGET))]
    const targets = [CATALOG, STORAGE]
    try { for (let i = 0; i < targets.length; i++) await atomicWrite(targets[i], next[i]) }
    catch (error) {
      for (let i = 0; i < targets.length; i++) {
        const digest = await digestFile(targets[i])
        assert(digest === sha(initial[i]) || digest === sha(next[i]), 'Concurrent edit during rollback')
        await atomicWrite(targets[i], initial[i])
      }
      throw error
    }
    await fs.writeFile(path.join(OUTPUT, 'activation.json'), json({ ...proof, activatedLocallyAt: new Date().toISOString(), siteDeployed: false }))
  }
  console.log(json({ mode: activate ? 'activated-locally' : 'verified', works: verified.length, bytes: manifest.bytes, origin: TARGET.publicOrigin, siteDeployed: false }))
}

async function main() {
  const args = process.argv.slice(2)
  const mode = args[0]
  assert(['--stage', '--verify', '--activate'].includes(mode), 'Use --stage [--fit-report path], --verify or --activate')
  if (mode === '--stage') {
    assert(args.length === 1 || (args.length === 3 && args[1] === '--fit-report'), 'Invalid staging arguments')
    await stage(args[2])
  } else {
    assert.equal(args.length, 1, 'Verification uses the pinned staged manifest')
    await verify(mode === '--activate')
  }
}

module.exports = { fittedCandidates, assertAssetLimits }
if (require.main === module) main().catch((error) => { console.error(error.message); process.exitCode = 1 })
