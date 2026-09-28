/* One approved retirement batch. No prefix deletion, local deletion or auto-discovery. */
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { createReadStream } = require('node:fs')
const fs = require('node:fs/promises')
const path = require('node:path')
const { execFile } = require('node:child_process')
const { promisify } = require('node:util')
const { assertApproved, getDelivery } = require('./publish-videos.cjs')
const runFile = promisify(execFile)
const ROOT = path.resolve(__dirname, '..')
const ORIGIN = 'https://litg6buf7wykmhtj.public.blob.vercel-storage.com'
const PRODUCTION = 'https://portfolio-chi-kohl-50.vercel.app'
const STORE = 'store_LitG6buF7WYKmHtJ'
const TASK = 'PORTFOLIO-VIDEO-CLEANUP-20260927-07'
const PLAN_SHA256 = 'b210cc81ea066872a6155d80725f2f32fd3355b278ba06404c52ef3eb657441d'
const PLAN = 'tmp/video-optimization/cleanup-plan.json'
const INPUTS = [PLAN, 'src/data/videos.json', 'src/data/video-selection.json', 'tmp/video-optimization/before-catalog.json']
const sha = (data) => createHash('sha256').update(data).digest('hex')
const canonicalUrl = (id, hash) => `${ORIGIN}/works/${id}/${hash}.mp4`

function validatePlan(plan, videos, selection, before) {
  assert.equal(plan.storeId, STORE, 'Unexpected store')
  assert.equal(plan.objects.length, 16, 'Only the approved 16 objects may be retired')
  assert.equal(videos.length, 26, 'Active catalog changed')
  assert.equal(selection.length, 26, 'Approved selection changed')
  assert.equal(before.length, 26, 'Original catalog changed')
  for (const items of [videos, selection, before, plan.objects]) {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'Duplicate work IDs')
  }
  const sortedIds = (items) => items.map((item) => item.id).sort()
  assert.deepEqual(sortedIds(videos), sortedIds(selection), 'Selection coverage changed')
  assert.deepEqual(sortedIds(videos), sortedIds(before), 'Original catalog coverage changed')
  const active = videos.map((video) => {
    const selected = selection.find((item) => item.id === video.id)
    assertApproved(video, selected, video.sha256)
    const delivery = getDelivery(video)
    assert.equal(video.publishedSha256, delivery.sha256, `Unpublished delivery: ${video.id}`)
    assert.equal(video.playbackUrl, canonicalUrl(video.id, delivery.sha256), `Unexpected active URL: ${video.id}`)
    return { id: video.id, url: video.playbackUrl, bytes: delivery.bytes, sha256: delivery.sha256 }
  })
  const activeUrls = new Set(active.map((item) => item.url))
  for (const item of plan.objects) {
    const video = videos.find((entry) => entry.id === item.id)
    const original = before.find((entry) => entry.id === item.id)
    assert(video && original && video.webDelivery, `Missing replacement: ${item.id}`)
    assert(!activeUrls.has(item.oldUrl), `Refusing to delete active media: ${item.id}`)
    assert.equal(item.oldUrl, canonicalUrl(item.id, original.sha256), 'Old URL differs from original hash')
    assert.equal(item.oldUrl, original.playbackUrl, 'Old URL differs from original publication')
    assert.equal(item.oldSha256, video.sha256, 'Old object must be the preserved original')
    assert.equal(item.oldSha256, original.sha256)
    assert.equal(item.oldBytes, original.bytes)
    assert.equal(item.newUrl, video.playbackUrl, 'Replacement is not the active URL')
    assert.equal(item.newSha256, video.webDelivery.sha256)
    assert.equal(item.newBytes, video.webDelivery.bytes)
    assert.notEqual(item.oldUrl, item.newUrl)
  }
  assert.equal(plan.objects.reduce((sum, item) => sum + item.oldBytes, 0), 388411505)
  assert.equal(active.reduce((sum, item) => sum + item.bytes, 0), 206214333)
  assert.equal(plan.deleteBytes, 388411505)
  assert.equal(plan.activeDeliveryBytes, 206214333)
  return active
}

function parseInventory(output) {
  const result = []
  for (const line of output.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('Uploaded At') || line.trim() === 'Fetching blobs' || /^Vercel CLI \d+\.\d+\.\d+$/.test(line.trim())) continue
    const match = line.match(/^\s*\S+\s+(\d+)\s+(\S+)\s+(https:\/\/\S+)\s*$/)
    assert(match, 'Unrecognized inventory row; refusing partial inventory')
    const [, bytes, pathname, url] = match
    assert.equal(url, `${ORIGIN}/${pathname}`, 'Unexpected inventory origin or path')
    result.push({ url, bytes: Number(bytes), pathname })
  }
  assert.equal(new Set(result.map((item) => item.url)).size, result.length, 'Duplicate inventory rows')
  return result
}

function assertInventory(actual, expected) {
  const normalize = (items) => items.map(({ url, bytes }) => ({ url, bytes })).sort((a, b) => a.url.localeCompare(b.url))
  assert.equal(JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected)), true,
    `Store inventory differs (${actual.length} actual, ${expected.length} expected); no broader cleanup is allowed`)
}

async function digestFile(filename) {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(filename)) hash.update(chunk)
  return hash.digest('hex')
}

async function verifyLocal(videos, selection) {
  const sourceRoot = await fs.realpath(path.resolve(ROOT, '../ai-video-hustle/productions'))
  const checked = []
  for (const video of videos) {
    const selected = selection.find((item) => item.id === video.id)
    const source = await fs.realpath(path.resolve(sourceRoot, selected.sourceFile))
    const relative = path.relative(sourceRoot, source)
    assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Original outside production archive')
    assertApproved(video, selected, await digestFile(source))
    assert.equal((await fs.stat(source)).size, video.bytes)
    const preview = path.join(ROOT, 'public/videos/media', `${video.id}.mp4`)
    assert.equal(await digestFile(preview), video.sha256, `Local preview differs: ${video.id}`)
    const delivery = getDelivery(video)
    assert.equal(await digestFile(delivery.filename), delivery.sha256, `Local delivery differs: ${video.id}`)
    assert.equal((await fs.stat(delivery.filename)).size, delivery.bytes)
    checked.push({ id: video.id, sourceFile: selected.sourceFile, sourceSha256: video.sha256, deliverySha256: delivery.sha256 })
  }
  return checked
}

async function head(item) {
  const response = await fetch(item.url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200, `Remote HEAD failed: ${item.id}`)
  assert.equal(Number(response.headers.get('content-length')), item.bytes, `Remote size differs: ${item.id}`)
  assert(/^video\/mp4(?:;|$)/.test(response.headers.get('content-type') || ''), 'Unexpected media type')
  const etag = response.headers.get('etag')
  assert(etag && /^"[a-zA-Z0-9-]+"$/.test(etag), 'Missing strong ETag')
  return { ...item, etag }
}

async function verifyPage(item) {
  const response = await fetch(`${PRODUCTION}/videos/${item.id}`, { redirect: 'error', signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200, `Production page unavailable: ${item.id}`)
  const html = await response.text()
  const sources = Array.from(html.matchAll(/<video\b[^>]*\bsrc="([^"]+)"/g), (match) => match[1])
  assert.deepEqual(sources, [item.url], `Production video does not use the replacement: ${item.id}`)
}

async function verifyRemote(item) {
  const metadata = await head(item)
  const response = await fetch(item.url, { redirect: 'error', signal: AbortSignal.timeout(120000) })
  assert.equal(response.status, 200, `Remote content unavailable: ${item.id}`)
  const hash = createHash('sha256')
  let bytes = 0
  for await (const chunk of response.body) { bytes += chunk.length; hash.update(chunk) }
  assert.equal(bytes, item.bytes, `Remote content length mismatch: ${item.id}`)
  assert.equal(hash.digest('hex'), item.sha256, `Remote replacement content mismatch: ${item.id}`)
  await verifyPage(item)
  console.log(`Verified production URL and complete remote SHA-256: ${item.id}`)
  return metadata
}

async function cli(args) {
  assert(process.env.BLOB_READ_WRITE_TOKEN, 'Load the existing authorized token into process memory only')
  const filename = process.env.VERCEL_CLI_PATH || path.join(process.env.APPDATA, 'npm/node_modules/vercel/dist/index.js')
  try {
    const result = await runFile(process.execPath, [filename, 'blob', ...args, '--no-color', '--non-interactive'], {
      cwd: ROOT, env: process.env, windowsHide: true, timeout: 120000, maxBuffer: 1024 * 1024,
    })
    // CLI 50 writes its human-readable inventory table to stderr.
    return result.stdout + '\n' + result.stderr
  } catch {
    throw new Error(`Vercel blob ${args[0]} failed; stopped without fallback or broader deletion`)
  }
}

async function main() {
  const flags = process.argv.slice(2)
  assert(flags.length === 1 && ['--check', '--delete'].includes(flags[0]), 'Use --check or the explicitly approved --delete')
  const deleting = flags[0] === '--delete'
  const rawInputs = await Promise.all(INPUTS.map((filename) => fs.readFile(path.join(ROOT, filename))))
  const hashes = rawInputs.map(sha)
  assert.equal(hashes[0], PLAN_SHA256, 'The frozen approved allowlist changed')
  const [plan, videos, selection, before] = rawInputs.map((raw) => JSON.parse(raw.toString('utf8')))
  const active = validatePlan(plan, videos, selection, before)
  const old = plan.objects.map((item) => ({ id: item.id, url: item.oldUrl, bytes: item.oldBytes, sha256: item.oldSha256 }))
  const expected = [...active, ...old]
  const auditDir = path.join(ROOT, 'tmp/video-cleanup', `${new Date().toISOString().replace(/[:.]/g, '-')}-${deleting ? 'delete' : 'check'}`)
  await fs.mkdir(auditDir, { recursive: true })
  const write = (name, value) => fs.writeFile(path.join(auditDir, name), JSON.stringify(value, null, 2) + '\n')
  const unchanged = async () => {
    for (let i = 0; i < INPUTS.length; i++) assert.equal(await digestFile(path.join(ROOT, INPUTS[i])), hashes[i], `Input changed during cleanup: ${INPUTS[i]}`)
  }
  const inventory = parseInventory(await cli(['list', '--limit', '100']))
  assertInventory(inventory, expected)
  await write('inventory-before.json', inventory)
  const locals = await verifyLocal(videos, selection)
  const remotes = []
  // Bound requests to avoid unnecessary verification traffic spikes.
  for (let i = 0; i < active.length; i += 3) remotes.push(...await Promise.all(active.slice(i, i + 3).map(verifyRemote)))
  const oldVersions = []
  for (const item of old) oldVersions.push(await head(item))
  await unchanged()
  await write('preflight.json', { task: TASK, time: new Date().toISOString(), storeId: STORE, planSha256: PLAN_SHA256, inputs: INPUTS.map((filename, i) => ({ filename, sha256: hashes[i] })), locals, remotes, deletionAllowlist: oldVersions })
  if (!deleting) {
    console.log(JSON.stringify({ mode: 'check', verifiedActive: active.length, verifiedOriginals: locals.length, deleteCount: old.length, deleteBytes: plan.deleteBytes, auditDir }))
    return
  }
  // A completed earlier preflight is never used as permission to skip fresh checks.
  assertInventory(parseInventory(await cli(['list', '--limit', '100'])), expected)
  const receipts = []
  for (const item of oldVersions) {
    await unchanged()
    const replacement = active.find((entry) => entry.id === item.id)
    await verifyPage(replacement)
    const currentReplacement = await head(replacement)
    assert.equal(currentReplacement.etag, remotes.find((entry) => entry.id === item.id).etag, 'Replacement changed after content verification')
    const currentOld = await head(item)
    assert.equal(currentOld.etag, item.etag, 'Old object changed after preflight')
    // Exactly one frozen URL and its observed version; no wildcard or pathname prefix.
    await cli(['del', item.url, '--if-match', item.etag])
    receipts.push({ id: item.id, deletedUrl: item.url, bytes: item.bytes, ifMatch: item.etag, replacementUrl: replacement.url, completedAt: new Date().toISOString() })
    await write('delete-receipts.json', receipts)
    console.log(`Retired approved old copy ${receipts.length}/16: ${item.id}`)
  }
  const after = parseInventory(await cli(['list', '--limit', '100']))
  assertInventory(after, active)
  await write('inventory-after.json', after)
  const localsAfter = await verifyLocal(videos, selection)
  await unchanged()
  const report = { task: TASK, completedAt: new Date().toISOString(), storeId: STORE, planSha256: PLAN_SHA256, deletedCount: receipts.length, deletedBytes: receipts.reduce((sum, item) => sum + item.bytes, 0), remainingObjects: after.length, remainingBytes: after.reduce((sum, item) => sum + item.bytes, 0), localOriginalsVerifiedBeforeAndAfter: localsAfter.length, activeRemoteContentHashesVerified: remotes.length, preservedInputHashes: hashes, auditDir }
  await write('report.json', report)
  console.log(JSON.stringify(report))
}

if (require.main === module) main().catch((error) => { console.error(error.message); process.exitCode = 1 })
module.exports = { validatePlan, parseInventory, assertInventory, PLAN_SHA256 }
