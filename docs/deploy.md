# Deploy - Portfolio

Target: Vercel.

## Local Runtime

```powershell
npm run dev
```

Port: `5110`.

## Build

```powershell
npm run build
```

## Environment

Use `.env.local` manually only. Do not edit env files through agents.

Expected categories:

- Supabase URL/key where content is backed by Supabase
- Public asset/config values

## Smoke

1. Build passes.
2. Home page loads.
3. Project/content sections render.
4. Public images and metadata resolve.

## Video gallery publication

Follow `docs/videos.md` before deploying a catalog change. The final-file selection
and upload steps are explicit; local MP4 copies never enter the deployment package.
`.vercelignore` also excludes source-selection provenance, operational docs, scripts,
environment files and local evidence.

The linked project is `portfolio` in `ramgtds-projects`; the verified production
domain is `https://portfolio-chi-kohl-50.vercel.app` (checked 2026-09-28).

Production builds from Git: every push to `master` creates a production deployment
from the committed tree. Release a catalog or gallery change by committing it,
pushing (Claude Code or the user; Codex never pushes) and verifying the resulting
Git build. After an authorized media upload:

```powershell
node scripts/publish-videos.cjs --check
npm run build
npm run lint
# commit the change with a TASK-ID subject, then push master
$env:VIDEO_TEST_BASE_URL = 'https://portfolio-chi-kohl-50.vercel.app'
$env:VIDEO_TEST_EVIDENCE_DIR = 'tmp/video-gallery-production'
node scripts/verify-videos.cjs --production
```

Do not deploy uncommitted files with `vercel deploy --prod`. That is how the
gallery went live on 2026-09-27, and the next unrelated push replaced it: from
2026-09-28 10:12 to 13:27 +0900 production `/videos` returned HTTP 404. For an
emergency restore, promote the last verified deployment
(`vercel promote <deployment-id> --yes`) and then commit the fix. A Ready build
alone is not proof of video playback or of the production alias serving the new
catalog. Preserve deployment IDs and browser evidence.

## Current state (2026-09-28)

- Hosting: Vercel Blob store `portfolio-videos`. Cloudflare R2 and Workers were
  evaluated and are **not adopted** (user decision, 2026-09-28). The sections
  about them below are a historical record only.
- Catalog: 23 works, 178,693,305 delivered bytes. Three were withdrawn because
  no record shows a finished piece: `hana-rin-giant` (the vault lineage note
  records it as failed, with the user's negative verdict on the last take),
  `envelope` (a single cliché test that came out landscape instead of the
  requested 9:16; never posted) and `ramz-dance` (a raw generation with no post,
  no user confirmation and no finished-deliverable record). Their source files
  and posters are kept. See `docs/videos.md`.
- Cleanup approved by the user on 2026-09-28:
  - The Worker `portfolio-videos` was deleted at 17:26 +0900. The Cloudflare API
    now answers "This Worker does not exist on your account" (code 10007).
  - 250 local files (1,418,068,636 bytes) under `tmp/video-workers-migration`,
    `tmp/video-r2-migration` and `tmp/video-asset-fit` were removed. Every MP4
    among them had a byte-identical copy in `tmp/video-delivery` or
    `public/videos/media`, and the 28 distinct copies were re-hashed after the
    deletion. The rest were unit-test scratch. The JSON records, logs, scripts and
    screenshots in those folders were kept, as was one trial encode
    (`eunseol-dance-crf22_5-veryslow.mp4`) that has no other copy.
  - The three withdrawn works' Blob objects (27,521,028 bytes) were deleted at
    18:34 +0900, each by exact URL with its ETag as `--if-match`. The user ran
    the step because the Claude Code auto-mode guard blocks remote deletion. The
    store now holds exactly the 23 active objects, 178,693,305 bytes. All three URLs
    returned 404 within about a minute, after the CDN purge. Receipts:
    `tmp/video-cleanup/2026-09-28T09-34-41-004Z-withdrawn-delete/`. Local
    byte-identical copies remain under `tmp/video-delivery/<id>/`, so a restored
    work can be re-uploaded.
- Homepage featured works: `seoul-cat`, `thirty-seconds`, `pickup`.
- Production was restored at 13:27 +0900 by promoting
  `73JGDYLtjfFgfq3i4UCmJT9o9Zvv`. The gallery was then committed (`79babd3`,
  task `PORTFOLIO-VIDEO-RESTORE-20260928-12`) and pushed. Its Git build
  `dpl_Arraz7f3oJwWr1vGBW4Jw7kVBE6j` was assigned to production automatically
  and passed `node scripts/verify-videos.cjs --production` (23 metadata decodes,
  8 plays with seeks, 0 browser errors; `tmp/video-gallery-production-20260928/`)
  and `publish-videos.cjs --check` (23 verified).
- Continuous playback from the user's connection, 14:12 +0900, CDN cache HIT:
  Eunseol dance, Delivery and Spider swing each played to the end at 0.99× real
  time or better with zero waiting events
  (`tmp/video-blob-continuous-probe-20260928.json`). Other ISPs and mobile were
  not measured.

## Published 2026-09-27

- Deployment: `BsTNFqLJpwFPeRFqq36YniRzBh9D`.
- Immutable URL: `https://portfolio-2jwibogpy-ramgtds-projects.vercel.app`.
- Production gallery: `https://portfolio-chi-kohl-50.vercel.app/videos`.
- Public Seoul Blob store: `portfolio-videos` (`store_LitG6buF7WYKmHtJ`).
- Media: 26 approved works, 443,723,284 bytes; every catalog publication hash
  matches its selected source hash. Local preview MP4s were excluded from the
  approximately 1.4 MB deployment upload.
- Verification: local build/lint, remote production build, 26 remote media checks,
  production browser acceptance and visual inspection passed. The browser decoded
  metadata for every work and played seven representative works, including KTX,
  Sweeper, Last Customer and Eunseol dance. No browser errors were recorded.
- Evidence: `tmp/video-gallery-production/report.json` and sibling PNGs; task
  `PORTFOLIO-VIDEO-PUBLISH-20260927-05`.

The deployment uses the authorized working directory, with no Git push. The
same-thread gallery baseline remains uncommitted; publication does not imply a
Git checkpoint. No paid-plan upgrade, local environment-file edit or source-media
modification was performed.

## Compressed delivery published 2026-09-27

- Deployment: `73JGDYLtjfFgfq3i4UCmJT9o9Zvv`.
- Immutable URL: `https://portfolio-apirxir22-ramgtds-projects.vercel.app`.
- Stable gallery: `https://portfolio-chi-kohl-50.vercel.app/videos`.
- Active media: 206,214,333 bytes across 26 works; 16 use verified compressed
  derivatives and 10 retain the original delivery. Reduction: 53.53%.
- Local build/lint, source/derivative hash checks, importer-refresh equivalence,
  focused regressions, remote production build and hosted browser acceptance passed.
  Every hosted detail route uses its selected URL; all 26 metadata decodes and seven
  representative actual playback checks passed with zero browser errors.
- Evidence: `tmp/video-optimization/report.json`, comparison PNGs and
  `tmp/video-optimization/production/report.json`; task
  `PORTFOLIO-VIDEO-COMPRESS-20260927-06`.

## Approved remote cleanup completed 2026-09-27

The user explicitly authorized retiring only the safely replaced old server copies.
Task `PORTFOLIO-VIDEO-CLEANUP-20260927-07` deleted exactly the 16 URLs in the frozen
`tmp/video-optimization/cleanup-plan.json`, reclaiming 388,411,505 bytes. The
authoritative store inventory now contains exactly the 26 current playback objects,
206,214,333 bytes, compared with 42 objects / 594,625,838 bytes before cleanup.

Before deletion, all 26 production video elements referenced their current catalog
URLs, and complete remote SHA-256 checks matched the local delivery files. The
26 production originals and local preview copies passed hash checks both before
and after deletion. Each delete used one exact old URL with its observed ETag as
an `if-match` condition; no prefix, store or local-file deletion was used. Catalog,
selection and approval-manifest hashes stayed unchanged.

Evidence: `tmp/video-cleanup/2026-09-27T12-28-17-577Z-delete/` contains the before/after
inventories, preflight, 16 receipts and result. The cleanup helper is deliberately
pinned to this historical batch and refuses a changed manifest or inventory; do
not reuse it as an automatic garbage collector. Restoring the initial uncompressed
deployment would require re-uploading its old URLs from the preserved local
originals. The current compressed deployment and stable production alias are unchanged.

Post-cleanup production verification passed: all 26 detail URLs and metadata
decodes, seven representative actual plays, HTTP byte-range seeking, filters and
responsive layouts, with zero browser errors. Evidence: `tmp/video-cleanup/production/`.

## R2 preparation 2026-09-27

> Not adopted. The user decided on 2026-09-28 not to use R2. Historical record;
> the numbers reflect that task's snapshot.

Task `PORTFOLIO-VIDEO-R2-20260927-08` prepares moving video delivery to Cloudflare R2
while retaining the existing Vercel website and its design. Active configuration
is still `vercel-blob`; no R2 cutover or deployment is claimed.

`scripts/migrate-videos-to-r2.cjs --stage` produced an exact 26-object / 206,214,333-byte
payload with checked source and delivery hashes. The manifest and catalog/storage
snapshots are under `tmp/video-r2-migration/`. Current catalog and final-cut selection
hashes are unchanged. Follow `docs/videos.md` for public-origin verification and
local activation; `--activate` never deploys or deletes an old remote object.

Cloudflare login is available. The user deferred R2 subscription activation after
reviewing the free monthly allowance, paid overages and automatic renewal.
The account has no registered domain for production R2 delivery. Resolve these
before creating the upload destination; a development `r2.dev` URL is not the
production substitute. Existing Blob objects and production deployment stay active.

Build/lint and 13 focused tests passed. The existing production gallery passed all
26 metadata decodes and seven actual playback checks with zero browser errors;
evidence is in `tmp/video-r2-migration/production-before/`. This validates the
unchanged Blob delivery, not an R2 deployment. Resume external migration only
after the user requests it again.

## Workers migration attempt 2026-09-28 — not adopted

> Not adopted. Continuous playback failed from the user's network (requests were
> served at LAX); Blob remains the host. Historical record. The Worker
> `portfolio-videos.clusteruni.workers.dev` and the staged payloads were deleted
> on 2026-09-28 with the user's approval.

Task `PORTFOLIO-VIDEO-WORKERS-20260928-10` uploaded the exact 26 selected delivery
files, totaling 193,648,104 bytes, to `portfolio-videos.clusteruni.workers.dev`.
Only Eunseol dance and Delivery use task 09's smaller copies; the other 24 files
and all original source hashes were preserved. Existing Wrangler OAuth was reused.
No R2 subscription, paid upgrade, Blob deletion or Git push occurred.

Static Assets alone did not provide the required Range response. The dedicated
Worker adds a public-media manifest, byte lengths/ranges, native full streams,
Cache API range delivery and Workers edge caching. Current version is
`cd6a2134-9481-4c21-9890-d74a717062d5`; generated bundle is
`d144eaf46b03a2f919979741578fd03a43e994c7c21547377fee0198c4305f69`.

**This is not a completed production migration.** HTTP range/HEAD and initial
Chromium playback passed, but full downloads were variable/slow. Continuous
Eunseol playback reached only 12.84 seconds after 44.16 wall seconds, with seven
waiting events. Native caching did not eliminate the bottleneck. Worker requests
were observed on LAX, whereas the account's existing Pages app reached ICN.
Worker runtime logs did not show CPU-limit errors. Routing is a plausible cause,
not a vendor-confirmed diagnosis.

The active catalog/storage/selection hashes remain their pre-migration values.
The production alias still serves Blob from Vercel deployment
`73JGDYLtjfFgfq3i4UCmJT9o9Zvv`; all 26 Blob copies remain available.
Evidence: `tmp/video-workers-migration/continuous-playback-probe.json`, the
immutable candidate/payload snapshots and diagnostic logs. There is no completed
current `remote-proof.json` or local activation receipt.

A later note here said the user had accepted an R2 recommendation. That was
superseded the same day: the user stopped the work for review and then decided
not to use R2.

## R2 continuation (2026-09-28) — not adopted

> Not adopted (user decision, 2026-09-28). Historical record; no R2 subscription,
> bucket or domain was created.

Task `PORTFOLIO-VIDEO-R2-20260928-11` retains the Vercel website and resumes R2
preparation. The live account still shows the R2 activation page. Its terms,
automatic renewal and excess-usage billing require action-time confirmation;
the production domain is also awaiting user input. No R2 subscription or bucket
was created, and no website deployment or remote deletion occurred.

The upload payload contains exactly 26 approved works / 193,648,104 bytes.
Only Eunseol dance and Delivery use the existing fitted copies. Original files,
selection and active catalog/storage hashes were verified unchanged. Twenty
publication/migration tests and focused lint passed. The production Eunseol
page returns HTTP200 and still references the original Blob origin.

Evidence: `tmp/video-r2-migration/manifest.json`, its immutable candidate/report
snapshots, and `activation-confirmation.png`. The R2 pilot will use the two largest
videos for full playback and seeking before uploading the other 24 and validating
all remote hashes. Account preparation is not hosted playback proof. Continue
with the exact commands in `docs/videos.md`; keep existing Blob copies throughout.

