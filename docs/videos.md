# Prompt-generated video portfolio

The user clarified on 2026-09-27 that the requested videos are their
prompt-generated works, such as Topview's 30-second challenge, DomoAI's
Pickup/Doppelganger shorts and Pollo's Seoul transformation. The previous
56-video video-autopilot shelf import was a scope error and is not part of
the gallery.

## Selection and provenance

The explicit source list is `src/data/video-selection.json`. It contains 23
works from the existing production archive: Topview (3), DomoAI (2), Pollo AI (11),
Newtake (6) and Google Flow (1). Each has a source MP4 and a local
provenance document. Prefer the recorded final or published version, with one
representative file per work. Dates are production/publication record dates,
not file modification times. Descriptions are concise portfolio copy; private
campaign, payment and operational notes never enter the page.

The source project is read-only:
`C:\vibe\projects\ai-video-hustle\productions`.
No source video, prompt, watermark or soundtrack was changed. Known creator
credit for the adapted burger-review prompt is retained, and recorded X posts
are linked from the detail pages. Recorded links have not been live-audited.

On 2026-09-27 the user confirmed four more Pollo works: KTX ink, Sweeper, Last Customer and Eunseol dance. The first three carry an experimental-work label on their cards; their production records are not treated as final-quality approval. The user also confirmed the neon-street Eunseol file, resolving its earlier filename mapping uncertainty. Source filenames remain unchanged. The spider-swing B-cut was not part of this four-work confirmation.

Do not bulk-import every MP4. Storyboard fragments, alternate takes, brand-supplied
promotional videos and references are not separate portfolio works. Experimental
drafts are included only when explicitly selected, as with the three confirmed additions. Unlogged Homekeeper/Downtown takes and Grok tests without keeper status and unclassified recovery exports
remain in the source archive; they have not been silently promoted to final work.
This selection is not an exhaustive audit of cloud accounts or every old download.

The first erroneous import's 56 preview copies and posters were preserved under
ignored `tmp/video-gallery/previous-import/`, outside `public/`. Their original
upload-shelf files were untouched.

## Refresh

```powershell
python -X utf8 scripts/sync-videos.py --copy-media
```

Uses existing Python, FFmpeg and FFprobe. The importer validates all source and
provenance paths, probes metadata, hashes MP4s, generates 960-pixel WebP stills at
an explicitly selected frame, and copies local preview media. It refuses duplicate
IDs and byte-identical duplicates. It only imports the selection manifest, so
source-folder additions cannot unexpectedly publish unrelated clips. Existing
HTTPS playback URLs are preserved only when the approved source hash and the
selected delivery hash still match. A verified web copy is preserved only when
its `sourceSha256` still identifies that same approved final cut. A revised cut
clears both the previous web-copy metadata and playback URL.

## Adding or replacing a final cut

The agent selects the final file; the scripts transfer only that explicit selection.
Ask to add a named work's final cut, or replace an existing work's final cut, and
state whether publication is included. An exact file path is helpful but optional
when the production record unambiguously identifies it.

1. Read the work's production record and identify the accepted complete cut. A newer
   file timestamp, a `final` filename, or a larger take number is not sufficient.
   Resolve conflicting records or an ambiguous last take with the user.
2. Keep one stable work ID. A revised cut replaces that work; an alternate take does
   not become a second card. Preserve the source archive.
3. Record the selected source, provenance, `approvedSha256` and confirmation date in
   `src/data/video-selection.json`. Do not automatically reapprove changed bytes.
4. Run the importer and inspect the poster and complete cut. Missing or mismatched
   approval hashes stop the importer before it changes output files.
5. Run `python -X utf8 scripts/optimize-videos.py --ids <changed-work-id>`, inspect its size/quality report
   and representative comparison frames, then run the same selection with `--apply` to select
   smaller verified web copies. The source selection and its approved hashes stay
   unchanged. Already compact or below-threshold results keep the original.
   Limit the operation to the changed works; a run without `--ids` recomputes
   every work.
6. Run `node scripts/publish-videos.cjs` for a local-only dry-run. It checks every
   approved source hash and any selected derivative hash before a network mutation.
7. The provider is Vercel Blob (`src/data/video-storage.json`); R2 and Workers are
   not adopted. With public-upload authorization and the approved store token in
   the process environment, run `node scripts/publish-videos.cjs --upload`.
   Media uses a content
   hash in its URL. Never overwrite an object with different bytes or retire old
   copies during publication.
8. Build and lint, commit the change and push `master` (Claude Code or the user);
   production builds from that push. Then run the browser verification against
   the actual production HTTPS domain (`docs/deploy.md`). Keep older remote
   objects for rollback; deleting them requires separate authorization.

## Web delivery copies

The initial upload copied the generation outputs byte for byte, totaling
443,723,284 bytes. Two approximately 28-second dance files alone accounted for
172,252,027 bytes, with source bitrates of approximately 29.5 and 20.5 Mbps.

The web-copy profile uses H.264 CRF 21, the slow preset and MP4 faststart. It keeps
the existing pixel dimensions and frame timestamps and stream-copies the original
audio. It does not crop, trim, upscale, change the soundtrack or select another take.
All candidate files remain under ignored `tmp/video-delivery/`. Full-video SSIM,
packet counts, duration, audio payload hashes and video/audio timestamps are checked;
only a result with SSIM at least 0.98 and more than 10% savings is selected. SSIM is
an engineering check, not proof of perceptual identity; inspect representative
frames and playback too. Reports are under `tmp/video-optimization/`.

The catalog's `sha256` and `bytes` continue to describe the approved source.
Optional `webDelivery` stores the derivative hash/size/profile and its source hash.
`publishedSha256` identifies the actual delivered bytes; the publisher checks
both sides of that relationship. Existing original-only entries remain valid.
Remote paths contain the delivered hash. Old remote copies are kept until a
separately authorized cleanup; smaller playback files alone do not reclaim the
space occupied by older objects.

The initial 2026-09-27 selection had 26 works, but its uniform
`selectionConfirmedAt` value overstated the approval: user confirmation is recorded
for 8 of them (the four examples above and the four Pollo additions); the rest
were chosen by the agent from production records. On 2026-09-28 every work was
checked for positive evidence that it is a finished piece:

- User confirmation (8): thirty-seconds, pickup, doppelganger, seoul-cat, ktx-ink,
  sweeper, last-customer, eunseol-dance.
- User post (11): hoodboy-sketch, burger-review, planche, same-prompt,
  spider-swing, eunseol-worldshatter, seedance-first, seedance-thirty and
  decade-shift on X; eunseol-han and eunseol-euljiro on Threads and Instagram
  (vault prompt notes, `posted` field).
- A production record naming the file as the lineage's finished deliverable (4):
  beolcho (the assembled 45-second cut), delivery (edit v3, retitled after the
  user's note), seoul-fpv (vault status `keeper`), boy-awakening (the completed
  15-second assembly). These have no user post or confirmation yet; confirm them
  with the user when convenient.

Withdrawn (source, poster and Blob object kept; re-adding the selection row
restores a work):

- `hana-rin-giant`: the vault lineage note has `status: failed`, `rating: 0`, and
  the user's verdict on take 5 was negative; "final" appeared only in the filename.
- `envelope`: the C6 cliché test, the only run of that prompt; it came out
  landscape instead of the requested 9:16 and was never posted.
- `ramz-dance`: a raw Pollo generation, recorded only as a user download and as a
  "surviving related asset"; no post, no confirmation, no finished-deliverable
  record. The user confirmed the paired Eunseol dance only.

The three explicitly requested experimental works retain their labels; that
exception does not authorize future draft imports. No folder watcher or automatic
bulk publication is configured.

## Design

The film collection extends the warm cream, stone and brass site palette.
A large featured still sits beside the main headline; a responsive one/two/three
column grid uses full-frame stills, concise descriptions, duration and platform
metadata. Tool filters, text search and progressive loading keep the collection
browsable. The detail page gives the player most of the width, followed by context,
credits and related films. Motion is limited to hover feedback and respects
reduced-motion preferences. Nothing auto-plays or downloads MP4s on the listing.
Homepage and navigation link to the collection.

## Workers publication workflow — not adopted

> Not adopted (2026-09-28). Continuous playback failed from the user's network
> and the user chose to stay on Blob. Historical record; do not run these steps.
> The Worker and its staged payloads were deleted on 2026-09-28 with the user's
> approval (`docs/deploy.md`, current state).

**Status at the time, 2026-09-28:** upload was complete, but production cutover
had not passed acceptance. All 26 objects are on Workers; the active catalog and
website still use Blob. A 44.16-second Chromium test advanced Eunseol by only
12.84 of its 27.57 seconds, with seven buffering events. Partial byte/hash checks
and successful playback starts are not release acceptance. See
`tmp/video-workers-migration/continuous-playback-probe.json`.

The Workers target is `https://portfolio-videos.clusteruni.workers.dev`; the
website keeps `https://portfolio-chi-kohl-50.vercel.app/videos`. Only video delivery
moves. R2 subscription activation remains deferred.

1. Run `node scripts/migrate-videos-to-workers.cjs --stage`. It checks the exact
   approved selection, original source hashes, delivery hashes and the 25 MiB
   file limit. It stages only the 26 selected MP4s and `_headers`, with immutable
   input snapshots and a generated Worker entry containing public paths/hashes.
   Never upload the evidence folder, source archive or credential files.
2. Read `tmp/video-workers-migration/manifest.json`. Use its exact generated
   `configFile` for the installed Wrangler CLI:
   `wrangler deploy --config tmp/video-workers-migration/<configFile> --no-autoconfig --keep-vars --strict`.
   Existing Cloudflare OAuth authentication is sufficient; no R2 or new token is
   required. Do not deploy the source template directly. The staged config binds
   the selected assets and the current range-handler implementation.
3. Run `node scripts/migrate-videos-to-workers.cjs --activate`. It verifies all
   remote full-file hashes, lengths, MIME types, cache/CORS headers and HTTP 206
   responses before changing the local catalog/storage pair. It repeats source
   hashes and rejects concurrent catalog/selection edits. `--verify` runs the
   same checks without activation. Neither command deploys the website or deletes
   any Blob objects. Retain the input snapshots for rollback.
4. Run the publisher dry-run, build/lint and focused video tests. Deploy the
   existing Vercel project, then run the production browser checks below against
   its stable URL. Actual playback/seeking and all 26 metadata decodes are required.

The first migration explicitly stages task 09's two fitted copies with
`--stage --fit-report tmp/video-asset-fit/report.json`. Subsequent additions use
plain `--stage`; do not reapply a historical report after replacing either final.
The publisher recognizes CRF 21/slow, CRF 22/slow and CRF 23/veryslow profiles and
binds each derivative to its approved source hash.

Runtime testing found that Static Assets alone returned the whole video for a
Range request. `cloudflare/videos/worker.mjs` supplies exact bounded/open/suffix
byte ranges and known lengths through the `ASSETS` binding. Full-file requests
use the platform's native stream pump; ranges stream only the requested output.
The manifest restricts public access to selected videos. Content-hash URLs receive
one-year immutable caching. The Cache API supplies native range responses when
available; Workers edge caching is also enabled. This handler uses `run_worker_first`, so media requests
consume the account's shared Workers Free allowance of 100,000 requests/day.
Do not describe this deployment as unlimited static-only request delivery. No
paid plan or R2 subscription was activated.

For rollback, restore the paired pre-migration catalog/storage snapshots and
redeploy the website. The previous 26 Blob objects are retained; their deletion
requires a separately approved, exact retirement list.

The account's existing `my1rm.pages.dev` was observed on ICN while this Worker
was observed on LAX from the same connection. This suggests a routing bottleneck,
not a confirmed Cloudflare diagnosis. Comparing a separate Pages media project
is awaiting the user's hosting preference; the existing Pages app was read only.
No Pages video project, R2 subscription or new Vercel deployment was created.

## Vercel Blob delivery history

The 26 source MP4s total 443,723,284 bytes and are Git-ignored local preview copies.
The user explicitly approved the concrete public-store/upload/deploy proposal on
2026-09-27, resolving the earlier automatic approval rejection. Store
`portfolio-videos` (`store_LitG6buF7WYKmHtJ`) now exists in `icn1`, public and active
on the existing Hobby team. All 26 works have verified public HTTPS URLs and
matching delivery hashes. The production alias serves this catalog:
`https://portfolio-chi-kohl-50.vercel.app/videos`.

The initial deployment `BsTNFqLJpwFPeRFqq36YniRzBh9D` completed on 2026-09-27 and the Vercel
CLI confirmed the existing production alias. Hosted browser verification passed:
26 media metadata decodes, actual playback of seven representative works including
all four confirmed Pollo additions, 12 Pollo filter entries, search/reset,
navigation, theme persistence and layouts at 320/390/768/1440 pixels. Browser
exceptions and console errors: zero. Desktop, Pollo and mobile collection captures
were visually inspected. This does not claim a complete audiovisual review of
every work. Evidence: `tmp/video-gallery-production/report.json` and sibling PNGs.

Compression follow-up `73JGDYLtjfFgfq3i4UCmJT9o9Zvv` was deployed on the same alias.
Its playback bytes were 206,214,333 (53.53% smaller): 16 verified compressed
copies and 10 unchanged source files. All 26 hosted detail pages contain the new
selected URL, all 26 metadata decodes and seven representative actual playback
checks passed, with no browser errors. Desktop and mobile player captures were
visually inspected. Evidence: `tmp/video-optimization/production/report.json`.

Storage cleanup was explicitly approved and completed on 2026-09-27 by
`PORTFOLIO-VIDEO-CLEANUP-20260927-07`. Only the frozen list of 16 superseded remote
copies was deleted, with per-object ETag conditions. Store inventory decreased
from 42 objects / 594,625,838 bytes to exactly 26 current objects / 206,214,333 bytes.
Reclaimed storage: 388,411,505 bytes. All 26 active remote files passed full-content
SHA-256 checks; local production originals and previews passed hash checks before
and after cleanup. No selected final cut or playback URL changed. The receipts and
inventories are under `tmp/video-cleanup/2026-09-27T12-28-17-577Z-delete/`.
Future replacements still need explicit final-cut selection and separate,
precisely scoped retirement approval. Do not scan for arbitrary unused blobs.
Post-cleanup remote checks and production browser acceptance passed again: 26
metadata decodes, seven actual plays, range seeking and zero browser errors.
Evidence: `tmp/video-cleanup/production/report.json` and its screenshots.

The host is the dedicated public Vercel Blob store on the already linked
Vercel Hobby team, with Seoul (`icn1`) storage. No paid-plan change was made. The
hosting decision and the Hobby limits (including the 30-day lockout when a limit
is exceeded) are in `docs/reference/vercel-video-delivery.md`.
The application only needs public URLs. Keep `BLOB_READ_WRITE_TOKEN` in the operator
process environment; never save it in code, logs, the catalog or `.env` through an
agent. The upload command reads the installed Vercel CLI; `VERCEL_CLI_PATH` can point
to its JavaScript entry point when it is not in the default Windows npm location.
The store is connected only to the project's remote development environment for
operator uploads; the production app receives no write token. With authorized CLI
access, list environment metadata, then use Vercel's individual environment-variable
API to load this one token into process memory. The list endpoint's old `decrypt`
query is deprecated. Do not print responses containing credentials or pull them
into local env files.
Before deployment, each entry must have a verified HTTPS `playbackUrl` and
`publishedSha256` matching its delivery hash (or the source hash without a web copy).
The legacy base-URL fallback is not accepted as publication proof.
YouTube embeds are not implemented. Hosting quotas and sources are recorded in
`docs/reference/vercel-video-delivery.md`.

## R2 migration — not adopted

> Not adopted. After the review of 2026-09-28 the user decided not to use R2;
> Vercel Blob stays the host. Historical record; do not run these steps. No R2
> subscription, bucket or domain was created. The numbers below are that task's
> snapshots and are not maintained. The staged payload folders were deleted on
> 2026-09-28; their manifests and reports remain.

Earlier on 2026-09-28 the user had accepted the recommendation to retain the Vercel website
and move video delivery to R2. Task `PORTFOLIO-VIDEO-R2-20260928-11` resumes the
earlier preparation. The live dashboard still shows the R2 subscription activation
page ($0 plus overages and automatic renewal). Action-time terms acceptance and
the user's production domain are pending. No bucket upload, R2 activation,
production switch or Blob deletion has been performed in this continuation.

The prepared set has 26 works / 193,648,104 bytes. It reuses the two already
verified fitted copies of Eunseol dance and Delivery; the other 24 deliveries,
approved source selection and original archive remain unchanged. Staging validates
every source and delivery hash. The active Blob catalog remains 206,214,333 bytes.

The website stays on Vercel. Only video delivery moves. `video-storage.json` pins
one exact HTTPS origin and provider for publication checks; catalog URLs must use
that origin plus `works/<id>/<delivery-sha256>.mp4`. An R2 S3 API endpoint or the
rate-limited development `r2.dev` endpoint is rejected for production delivery.
Use a confirmed custom domain from the same Cloudflare account as the bucket.

1. Run `node scripts/migrate-videos-to-r2.cjs --stage --fit-report tmp/video-asset-fit/report.json`.
   The optional fit report selects only the two previously verified derivatives;
   pass the same report to every verification/activation command in this migration.
   The command checks the explicit
   final-cut selection, archive source hashes and delivered bytes, then records
   a manifest and immutable catalog/storage snapshots under
   `tmp/video-r2-migration/`. Its reported `payload-<candidate-sha256>/works` folder
   contains exactly the selected object keys. Re-staging rejects extra takes,
   mismatched bytes and symbolic links; it never cleans a directory by deletion.
2. Activate R2 only after the subscription terms are accepted. Create a dedicated
   Standard bucket. First upload only the manifest objects for `eunseol-dance`
   and `delivery`; preserve the complete `works/<id>/<sha256>.mp4` keys.
   Upload only the manifest's MP4s, not the evidence folder,
   source archive, selection/provenance records or credential files. Prefer
   `video/mp4` and `Cache-Control: public, max-age=31536000, immutable` for these
   content-addressed objects. Do not reuse an occupied key with different bytes.
3. Connect the agreed production domain to the bucket. Verify both pilot files'
   full hashes and HTTP ranges, then play each to the end and seek in a browser.
   Require playback to advance at normal speed after startup without repeated
   buffering. The previous Workers failure showed that one second of playback
   is insufficient acceptance. Only after this pilot passes, upload the other 24.
   Run `node scripts/migrate-videos-to-r2.cjs --verify --origin https://<approved-domain> --fit-report tmp/video-asset-fit/report.json`.
   All objects must pass MIME, size, HTTP 206 byte-range and complete SHA-256 checks.
   The command writes `remote-proof.json`; verification does not change the catalog.
4. Run the same command with `--activate` to repeat validation and replace only the
   local playback URLs, publication hashes and storage configuration. It keeps all
   work metadata, approved source hashes and final-cut selection. Input changes
   abort activation. Snapshots are retained, file replacements use atomic renames,
   and `activation.json` explicitly records that deployment is still pending.
5. Build/lint and deploy the existing Vercel project, then run production browser
   verification. A successful R2 content check alone does not prove hosted playback.
   Retain current Blob objects as rollback copies; retiring them requires a new,
   exact approved list after successful production verification.

For later additions, explicitly select and verify the new final cut first, using
the same intake/encoding workflow above. Upload new content-hash keys, then verify
the complete current catalog before activation. There is no folder scan that
automatically promotes newer takes and no automatic remote deletion.

The preparation command stages 26 objects totaling 206,214,333 bytes. This is a
storage-provider migration of the already verified web copies, not another
re-encode. Account/domain setup and real R2/production proof remain on hold until
the user resumes the migration. Existing production verification passed: all 26
metadata decodes, seven actual playback checks and zero errors, with evidence in
`tmp/video-r2-migration/production-before/`. Build/lint and 13 focused tests passed.

## Two copies prepared for the static-asset size limit

> Only needed for the Workers 25 MiB limit, so unused. Blob serves the CRF 21
> copies, which score higher (Eunseol luma SSIM 0.9818 vs 0.9770).

On 2026-09-28, task `PORTFOLIO-VIDEO-FIT-20260927-09` prepared only the two
delivery files exceeding Cloudflare Workers Static Assets' 25 MiB per-file limit.
That task ended with local candidates; Workers publication is a separate task below.

| Work | Previous Blob delivery | Prepared Workers copy | Encoding | Full-video SSIM |
| --- | ---: | ---: | --- | ---: |
| Eunseol dance | 34,856,084 bytes / 33.24 MiB | 25,822,430 bytes / 24.63 MiB | H.264 CRF 23, veryslow | 0.981502 |
| Delivery | 27,672,170 bytes / 26.39 MiB | 24,139,595 bytes / 23.02 MiB | H.264 CRF 22, slow | 0.989103 |

The files were `tmp/video-asset-fit/eunseol-dance-crf23-veryslow.mp4` and
`tmp/video-asset-fit/delivery-crf22-slow.mp4`. Those two paths were removed on
2026-09-28; byte-identical copies remain under `tmp/video-delivery/eunseol-dance/`
and `tmp/video-delivery/delivery/`. `report.json` in `tmp/video-asset-fit`
records their complete hashes and the approved source hashes. They were encoded
from the approved originals, not from the previous compressed copies. Dimensions,
frame counts, video/audio timestamps and audio payloads match the originals.
Full-file decoding passed, as did Chromium playback and seeking with HTTP 206
range responses. Representative side-by-side frames were inspected. Video is
still lossy; these checks do not establish universal perceptual identity.

Using these two files with the other 24 unchanged delivery files totals
193,648,104 bytes, with all 26 below 25 MiB each. Task 09 preserved original
archive/preview hashes, the selection manifest and the active catalog; it did not
upload, replace or delete remote files. Task 10 adds the two profiles to the
publisher and handles Workers publication. The historical R2 payloads were
deleted on 2026-09-28.

Historical verification commands for task 09's exact prepared files. They no
longer run as written, because the MP4s they read were removed on 2026-09-28:

```powershell
python -X utf8 tmp/video-asset-fit/fit.py --verify
node tmp/video-asset-fit/verify-playback.cjs
```

Evidence: `tmp/video-asset-fit/report.json`, `playback-report.json` and six
comparison PNGs. This is local media acceptance, not Cloudflare-hosted proof.

## Verification

```powershell
npm run build
npm run lint
npm start
# In another terminal:
node scripts/verify-videos.cjs
# After approved publication, against the actual production site:
node scripts/publish-videos.cjs --check
$env:VIDEO_TEST_BASE_URL = 'https://portfolio-chi-kohl-50.vercel.app'
$env:VIDEO_TEST_EVIDENCE_DIR = 'tmp/video-gallery-production'
node scripts/verify-videos.cjs --production
```

Checks selection coverage and absence of the mistaken shelf scope, tool filters,
search/reset, source credits, navigation, sitemap, 404s, theme persistence,
desktop/mobile layouts, actual landscape/portrait/square playback, metadata
decoding for every catalog MP4 and byte-range seeking. Browser captures and the machine
report go to the configured ignored evidence directory. `--production` rejects
unresolved or stale media URLs and requires the actual HTTPS deployment address.
