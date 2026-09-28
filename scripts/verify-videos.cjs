/* Browser acceptance for the video gallery. Uses workspace-installed Playwright. */
async function main() {
  const assert = (await import('node:assert/strict')).default
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  const { chromium } = await import('playwright')
  const root = path.resolve(__dirname, '..')
  const videos = JSON.parse(await fs.readFile(path.join(root, 'src/data/videos.json'), 'utf8'))
  const selection = JSON.parse(await fs.readFile(path.join(root, 'src/data/video-selection.json'), 'utf8'))
  const production = process.argv.includes('--production')
  assert.equal(new Set(videos.map((v) => v.id)).size, videos.length, 'No duplicate works')
  assert.deepEqual(videos.map((v) => v.id).sort(), selection.map((v) => v.id).sort(), 'Every selected prompt work is imported')
  assert(videos.every((v) => !/^(folklore|armory|essays)-/.test(v.id)), 'Exclude the mistaken upload-shelf scope')
  const confirmedPollo = ['ktx-ink', 'sweeper', 'last-customer', 'eunseol-dance']
  for (const id of confirmedPollo) {
    const video = videos.find((item) => item.id === id)
    assert(video && video.platform === 'pollo', `User-confirmed Pollo work: ${id}`)
    assert.equal(video.isExperiment, id !== 'eunseol-dance', `Experimental-work label: ${id}`)
  }
  for (const video of videos) {
    assert.equal(selection.find((item) => item.id === video.id).approvedSha256, video.sha256, `Explicit final-file selection: ${video.id}`)
    assert(video.duration > 0 && video.width > 0 && video.height > 0)
    assert(!/업로드할 때|체크리스트|올리기 전에|C:\\vibe|TASK-ID/.test(video.description + video.credits), `Public-only copy: ${video.id}`)
    await fs.access(path.join(root, 'public', video.poster))
  }
  if (production) {
    const { getDelivery, assertPlaybackUrl } = require('./publish-videos.cjs')
    for (const video of videos) {
      assert.equal(video.publishedSha256, getDelivery(video).sha256, 'Verified delivery bytes are required before deployment')
      assertPlaybackUrl(video.playbackUrl, video)
    }
    assert(/^https:\/\//.test(process.env.VIDEO_TEST_BASE_URL || ''), 'Production proof requires the actual HTTPS deployment URL')
  }
  const evidence = path.resolve(root, process.env.VIDEO_TEST_EVIDENCE_DIR || 'tmp/video-gallery')
  assert(evidence.startsWith(path.join(root, 'tmp') + path.sep), 'Keep browser evidence in the ignored tmp directory')
  await fs.mkdir(evidence, { recursive: true })
  const base = process.env.VIDEO_TEST_BASE_URL || 'http://localhost:5110'
  const browser = await chromium.launch({ headless: true })
  const report = { videos: videos.length, mediaMetadata: [], playback: [], errors: [] }
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' })
    const page = await context.newPage()
    const mp4Requests = []
    page.on('pageerror', (error) => report.errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') report.errors.push(message.text()) })
    page.on('request', (request) => { if (/\.mp4(?:$|\?)/.test(request.url())) mp4Requests.push(request.url()) })
    await page.goto(`${base}/videos`, { waitUntil: 'domcontentloaded' })
    await page.locator('#videos-heading').waitFor()
    await page.waitForFunction(() => document.querySelector('header').getBoundingClientRect().top >= -1)
    await page.waitForFunction(() => [...document.images].slice(0, 4).every((img) => img.complete && img.naturalWidth > 0))
    assert.equal(mp4Requests.length, 0, 'Gallery does not download videos')
    const cards = page.locator('[data-testid="video-grid"] > a')
    assert.equal(await cards.count(), Math.min(12, videos.length))
    await page.screenshot({ path: path.join(evidence, 'desktop.png') })
    await page.locator('#all-videos').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
    await page.waitForFunction(() => document.querySelector('header').className.includes('shadow-sm'))
    await page.locator('header').evaluate(async (el) => Promise.allSettled(el.getAnimations().map((animation) => animation.finished)))
    await page.screenshot({ path: path.join(evidence, 'collection.png') })
    while (await page.getByRole('button', { name: /^영상 더 보기/ }).count()) await page.getByRole('button', { name: /^영상 더 보기/ }).click()
    assert.equal(await cards.count(), videos.length, 'Every prompt work is reachable')
    for (const [id, name] of [['topview', 'Topview'], ['domoai', 'DomoAI'], ['pollo', 'Pollo AI'], ['newtake', 'Newtake'], ['flow', 'Google Flow']]) {
      const group = videos.filter((v) => v.platform === id)
      const count = group.length
      await page.getByRole('button', { name: `${name} ${count}`, exact: true }).click()
      assert.equal(await page.getByRole('status').innerText(), `${count}편의 영상`)
      const expected = new Set(group.map((v) => `/videos/${v.id}`))
      assert((await cards.evaluateAll((links) => links.map((link) => link.getAttribute('href')))).every((url) => expected.has(url)))
      if (id === 'pollo') {
        for (const workId of confirmedPollo) assert.equal(await page.locator(`[data-testid="video-grid"] > a[href="/videos/${workId}"]`).count(), 1, `Pollo filter includes ${workId}`)
        assert.equal(await cards.getByText('실험작', { exact: true }).count(), group.filter((v) => v.isExperiment).length)
        await page.locator('#all-videos').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
        await page.waitForFunction(() => [...document.querySelectorAll('[data-testid="video-grid"] img')].slice(0, 3).every((img) => img.complete && img.naturalWidth > 0))
        await page.screenshot({ path: path.join(evidence, 'pollo.png') })
      }
    }
    await page.getByRole('button', { name: /^전체 / }).click()
    await page.getByRole('searchbox', { name: '영상 검색' }).fill('도플갱어')
    assert.equal(await cards.count(), 1)
    await page.getByRole('searchbox', { name: '영상 검색' }).fill('존재하지않는영상123')
    await page.getByText('검색 결과가 없어요', { exact: true }).waitFor()
    await page.getByRole('button', { name: '전체 영상 보기', exact: true }).click()
    await page.getByRole('button', { name: '다크 모드', exact: true }).click()
    assert(await page.locator('html').evaluate((el) => el.classList.contains('dark')))
    await page.waitForFunction(() => getComputedStyle(document.body).backgroundColor === 'rgb(28, 25, 23)')
    await page.evaluate(() => scrollTo(0, 0))
    await page.screenshot({ path: path.join(evidence, 'dark.png') })
    await page.reload({ waitUntil: 'domcontentloaded' })
    assert(await page.locator('html').evaluate((el) => el.classList.contains('dark')), 'Theme survives reload')
    await page.getByRole('button', { name: '라이트 모드', exact: true }).click()
    for (const id of ['seoul-cat', 'thirty-seconds', 'same-prompt', 'delivery', ...confirmedPollo]) {
      const video = videos.find((v) => v.id === id)
      await page.goto(`${base}/videos/${id}`, { waitUntil: 'domcontentloaded' })
      await page.getByRole('heading', { name: video.title, exact: true }).waitFor()
      if (production) assert.equal(await page.locator('video').getAttribute('src'), video.playbackUrl, `Hosted page uses the selected delivery URL: ${id}`)
      await page.locator('video').evaluate(async (el) => { el.muted = true; await el.play() })
      await page.waitForFunction(() => document.querySelector('video').currentTime > 0.35)
      await page.waitForFunction(() => document.querySelector('header').getBoundingClientRect().top >= -1)
      const playback = await page.locator('video').evaluate((el) => ({ time: el.currentTime, duration: el.duration, width: el.videoWidth, readyState: el.readyState }))
      assert(playback.width > 0 && Math.abs(playback.duration - video.duration) < 1)
      await page.locator('video').evaluate((el) => el.pause())
      const seekTime = video.duration * .7
      await page.locator('video').evaluate((el, time) => { el.currentTime = time }, seekTime)
      await page.waitForFunction((time) => { const el = document.querySelector('video'); return !el.seeking && el.readyState >= 2 && Math.abs(el.currentTime - time) < .1 }, seekTime)
      report.playback.push({ id, ...playback, seekTime, url: await page.locator('video').getAttribute('src') })
      if (id === 'seoul-cat') await page.screenshot({ path: path.join(evidence, 'player.png') })
      if (['eunseol-dance', 'delivery'].includes(id)) await page.screenshot({ path: path.join(evidence, `${id}-player.png`) })
    }
    // Decode metadata from every imported media file, not just the selected cards.
    for (const video of videos) {
      const src = video.playbackUrl || `${base}/videos/media/${video.id}.mp4`
      if (production) {
        const detail = await context.request.get(`${base}/videos/${video.id}`)
        assert.equal(detail.status(), 200)
        assert((await detail.text()).includes(video.playbackUrl), `Production route publishes the verified URL: ${video.id}`)
      }
      const meta = await page.locator('video').evaluate((el, url) => new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Media timeout: ${url}`)), 15000)
        el.onloadedmetadata = () => { clearTimeout(timer); resolve({ duration: el.duration, width: el.videoWidth, height: el.videoHeight }) }
        el.onerror = () => { clearTimeout(timer); reject(new Error(`Media failed: ${url}`)) }
        el.src = url
        el.load()
      }), src)
      assert(meta.width === video.width && meta.height === video.height && Math.abs(meta.duration - video.duration) < 1, video.id)
      report.mediaMetadata.push(video.id)
    }
    const rangeVideo = videos.find((video) => video.id === 'seoul-cat')
    const response = await context.request.get(rangeVideo.playbackUrl || `${base}/videos/media/seoul-cat.mp4`, { headers: { Range: 'bytes=0-31' } })
    assert.equal(response.status(), 206, 'Byte-range seeking is supported')
    const mobile = await context.newPage({ viewport: { width: 390, height: 844 } })
    await mobile.setViewportSize({ width: 390, height: 844 })
    mobile.on('pageerror', (error) => report.errors.push(error.message))
    await mobile.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
    await mobile.getByRole('button', { name: '메뉴 열기' }).click()
    await mobile.getByRole('link', { name: '영상', exact: true }).click()
    await mobile.locator('#videos-heading').waitFor()
    await mobile.locator('header').getByRole('link', { name: '영상', exact: true }).waitFor({ state: 'hidden' })
    await mobile.waitForFunction(() => [...document.images].slice(0, 2).every((img) => img.complete && img.naturalWidth > 0))
    await mobile.locator('[data-testid="video-grid"] img').evaluateAll(async (imgs) => Promise.all(imgs.slice(0, 2).map((img) => img.decode())))
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No mobile horizontal overflow')
    await mobile.screenshot({ path: path.join(evidence, 'mobile.png') })
    await mobile.locator('#all-videos').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
    await mobile.waitForFunction(() => {
      const collection = document.getElementById('all-videos')
      return Math.abs(collection.getBoundingClientRect().top - parseFloat(getComputedStyle(collection).scrollMarginTop)) < 2
    })
    await mobile.waitForFunction(() => document.querySelector('header').className.includes('shadow-sm'))
    await mobile.locator('header').evaluate(async (el) => Promise.allSettled(el.getAnimations().map((animation) => animation.finished)))
    await mobile.screenshot({ path: path.join(evidence, 'mobile-collection.png') })
    await mobile.locator('[data-testid="video-grid"] > a').first().click()
    await mobile.locator('video').evaluate(async (el) => { el.muted = true; await el.play() })
    await mobile.waitForFunction(() => document.querySelector('video').currentTime > 0.35)
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No player overflow')
    await mobile.screenshot({ path: path.join(evidence, 'mobile-player.png') })
    for (const width of [320, 768]) {
      await mobile.setViewportSize({ width, height: 900 })
      await mobile.goto(`${base}/videos`, { waitUntil: 'domcontentloaded' })
      assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`)
    }
    await page.goto(base, { waitUntil: 'domcontentloaded' })
    await page.locator('#featured-videos-heading').waitFor()
    assert.equal(await page.getByRole('link', { name: `${videos.length}편 모두 보기` }).count(), 1)
    const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text()
    assert(videos.every((v) => sitemap.includes(`/videos/${v.id}`)))
    assert(!/videos\/(folklore|armory|essays)-/.test(sitemap))
    await page.goto(`${base}/videos/burger-review`, { waitUntil: 'domcontentloaded' })
    assert((await page.locator('article').innerText()).includes('임팔'), 'Shared prompt credit retained')
    assert.equal(await page.getByRole('link', { name: '처음 올린 글 보기' }).getAttribute('href'), 'https://x.com/ramztd/status/2081223592298332606')
    assert.equal((await context.request.get(`${base}/videos/armory-24`)).status(), 404, 'Old scope is removed')
    assert.equal((await context.request.get(`${base}/videos/not-a-real-video`)).status(), 404)
    assert.deepEqual(report.errors, [], 'No browser exceptions or console errors')
    report.result = 'PASS'
  } finally {
    await fs.writeFile(path.join(evidence, 'report.json'), JSON.stringify(report, null, 2))
    await browser.close()
  }
  console.log(JSON.stringify({ result: report.result, videos: videos.length, metadataLoaded: report.mediaMetadata.length, playback: report.playback.map((v) => v.id), browserErrors: report.errors.length, evidence }))
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
