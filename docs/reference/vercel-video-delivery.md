---
last_verified: 2026-09-28
sources:
  - https://vercel.com/docs/vercel-blob/usage-and-pricing
  - https://vercel.com/docs/cli/blob
  - https://vercel.com/docs/cli/deploy
  - https://vercel.com/docs/builds/build-features
  - https://ffmpeg.org/ffmpeg-codecs.html
  - https://ffmpeg.org/ffmpeg-formats.html
  - https://ffmpeg.org/ffmpeg.html#Streamcopy
  - https://vercel.com/docs/vercel-blob/using-blob-sdk
  - https://developers.cloudflare.com/r2/pricing/
  - https://developers.cloudflare.com/r2/buckets/public-buckets/
  - https://developers.cloudflare.com/r2/api/s3/api/
  - https://developers.cloudflare.com/r2/examples/rclone/
  - https://developers.cloudflare.com/workers/platform/limits/#static-assets
  - https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
  - https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/
  - https://developers.cloudflare.com/workers/runtime-apis/cache/
  - https://developers.cloudflare.com/workers/cache/configuration/
  - https://developers.cloudflare.com/workers/platform/pricing/
  - https://developers.cloudflare.com/pages/platform/limits/
  - https://developers.cloudflare.com/pages/configuration/serving-pages/
  - https://support.google.com/youtube/answer/171780?hl=en
  - https://developers.google.com/youtube/player_parameters
  - https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs
reliability: vendor-doc
aliases:
  - Portfolio video hosting
  - Vercel Blob final cut publication
refresh_trigger: Before changing storage, account plan, quotas or deployment delivery
---

# Portfolio video delivery

## Decision and current evidence

The existing Vercel account reports the `hobby` plan and an active team with the
linked `portfolio` project. The approved 26 files total 443,723,284 bytes. Following
explicit user approval, public store `portfolio-videos` (`store_LitG6buF7WYKmHtJ`)
was created in Seoul (`icn1`). The earlier automatic approval rejection was resolved
by that confirmation, not by changing transport or bypassing it.

Keep complete source originals locally. Use immutable hash paths for approved
cuts so a replacement cannot silently keep playing a cached older file. This
selection rule is a project decision, not a claim made by Vercel's documentation.

## Verified vendor behavior

- Hobby includes 1 GB of Blob storage and 10 GB of Blob transfer. It has no paid
  overage; hitting a limit can make Blob unavailable until its quota resets.
  This catalog fits the storage allowance, but visitor playback consumes transfer.
- Blob CLI supports public uploads, explicit paths and MIME types. Overwrite is
  opt-in. Existing CLI 50.32.3 supports the needed commands; no update is required.
- Vercel CLI can deploy the working directory directly. Production deployment does
  not require a Git push. Do not use `--public`, which exposes deployment source.
- Use explicit deployment exclusions for large local media, environment files,
  private selection records and operational evidence.

## Source links

- [Blob usage and pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing)
- [Blob CLI](https://vercel.com/docs/cli/blob)
- [Deploy CLI](https://vercel.com/docs/cli/deploy)
- [Deployment file exclusions](https://vercel.com/docs/builds/build-features)

## Outcome

Local scripts enforce selected-file hashes and require remote verification before
catalog publication. Store creation and active billing state are verified through
the Vercel API. All 26 approved files were uploaded and passed the unchanged strict
remote MIME, byte-length and range checks. An initial CDN range response for the
102 MB Eunseol dance object transiently reported an incorrect total immediately
after upload; subsequent independent HEAD/range probes and the full checker passed.
No content was overwritten and no check was weakened.

The existing production alias serves the new catalog after deployment
`BsTNFqLJpwFPeRFqq36YniRzBh9D`. Production browser acceptance passed with all 26
media metadata decodes, seven actual playback checks including that large object,
12 Pollo filter entries, responsive layouts and no browser errors. Evidence is in
`tmp/video-gallery-production/report.json`; deployment details are in
`docs/deploy.md`. This observed result supports the initial hosting decision; it
does not establish unlimited future storage or traffic capacity.

Capacity estimate for the initial set: about 556 MB remains out of a decimal 1 GB
storage allowance. A 10 GB transfer allowance is about 586 average full-file plays
at this set's mean file size. This is a rough equivalent, not a viewer count;
partial playback, repeats, caching and verification requests affect actual usage.

## Web-copy compression follow-up

The user challenged the original 444 MB upload size. Local FFprobe measurements
showed the two 28-second dance exports used approximately 29.5 and 20.5 Mbps.
The initial deployment had preserved generation-output bytes without optimizing
them for delivery. This is the cause of the avoidable transfer/storage size.

FFmpeg's [libx264 options](https://ffmpeg.org/ffmpeg-codecs.html#libx264_002c-libx264rgb)
support CRF quality control and encoder presets. Its
[MP4 faststart option](https://ffmpeg.org/ffmpeg-formats.html#mov_002c-mp4_002c-ismv)
moves the index to the beginning for playback; this is not the compression step.
[Stream copy](https://ffmpeg.org/ffmpeg.html#Streamcopy) copies audio packets without
decoding/re-encoding. The implementation uses all three: CRF 21 / slow for video,
faststart for the container, and stream copy for audio.

Project choice: preserve resolution and timing, keep full-range/HDR or unsupported
audio formats unchanged, and select a derivative only when it saves over 10% and
full-video SSIM is at least 0.98. These thresholds are project judgments, not vendor
quality guarantees. Verify actual dimensions, packet counts, timestamps, duration,
audio hashes, comparison frames and hosted playback. Each derivative remains tied
to the approved source SHA-256; it never substitutes a different creative take.

Keep old remote objects until explicit cleanup approval. Report active playback
bytes and total stored bytes separately while rollback copies coexist.

Observed outcome on 2026-09-27: 16 selected derivatives and 10 unchanged files
reduce active playback bytes from 443,723,284 to 206,214,333 (53.53%). Minimum
selected full-video SSIM is 0.981549; audio hashes, dimensions, frame counts and
timestamps match. Five sampled frame comparisons and hosted playback were checked.
Deployment `73JGDYLtjfFgfq3i4UCmJT9o9Zvv` serves the compressed catalog; all 26
detail URLs/metadata checks and seven representative playback checks passed.

Conclusion: useful savings are demonstrated without resizing, but the video is
still lossy and selected-frame inspection is not universal perceptual equivalence.
After explicit retirement approval, task `PORTFOLIO-VIDEO-CLEANUP-20260927-07`
deleted only those 16 older copies (388,411,505 bytes). The store inventory is now
26 active objects / 206,214,333 bytes. Original local production files remain
untouched and all 26 source hashes were verified before and after cleanup.

The [Blob SDK reference](https://vercel.com/docs/vercel-blob/using-blob-sdk#del)
documents `ifMatch` for deletion of a single URL. The installed CLI accepted this
condition for all 16 deletes. We pinned the manifest SHA-256, verified current
production URLs and full remote replacement hashes, then checked exact remaining
inventory equality. Evidence: `tmp/video-cleanup/2026-09-27T12-28-17-577Z-delete/`.

## Alternatives reassessed after the size question

The original raw upload was avoidable: web-delivery encoding should have preceded
publication. The 206 MB result is a measured conservative improvement, not a
demonstrated minimum or a comparison of all hosting choices. This follow-up is
research only; no account migration, new codec or resolution change was applied.

| Option | Benefit for this portfolio | Constraint and evidence |
| --- | --- | --- |
| Tune H.264 quality per clip or limit delivery resolution | Can reduce the actual stored/transferred bytes while retaining the site's player | The current profile keeps source resolution. More aggressive CRF/resizing requires measured visual comparisons; no further savings estimate has been validated. [FFmpeg controls](https://ffmpeg.org/ffmpeg-codecs.html#libx264_002c-libx264rgb). |
| AV1 with H.264 fallback | More efficient video delivery on compatible devices | [MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs#av1) documents Safari's hardware-dependent support. Keeping both encodings adds stored objects; it does not automatically save total storage. No AV1 benchmark was run for these works. |
| Cloudflare R2 Standard, retaining the custom gallery/player | Larger free storage allowance and no direct Internet egress charge | [Pricing](https://developers.cloudflare.com/r2/pricing/) includes 10 GB-month storage, 1 million Class A and 10 million Class B requests monthly; excess storage/requests cost money. [Production public delivery](https://developers.cloudflare.com/r2/buckets/public-buckets/) uses a custom domain; the r2.dev endpoint is rate-limited and for development. Moving hosts does not compress the files. |
| YouTube embeds | Video bytes are hosted/delivered by YouTube instead of this Blob store | [Embedding](https://support.google.com/youtube/answer/171780?hl=en) uses YouTube's player and may display ads. [Player parameters](https://developers.google.com/youtube/player_parameters#rel) cannot disable related videos entirely; channel branding/player behavior reduces presentation control. No upload or integration was performed. |

Project judgment: for a growing collection with the current custom presentation,
R2 plus tested web encodes is the stronger capacity/traffic candidate, provided a
production domain and account setup are acceptable. YouTube embedding is simpler
if its player is acceptable. For the current 26 works, existing Blob storage now
fits comfortably at 206 MB, but its 10 GB transfer allowance can become a constraint
before storage. These are fit assessments from vendor limits, not measured latency
or perceptual-quality comparisons. Preserve approved originals under every option.
(Superseded by the decision below.)

## Decision, 2026-09-28: stay on Vercel Blob

The user decided not to use R2. Cloudflare Workers is not adopted either. The
sections after this one are a historical record.

Evidence for Blob:

- Measured from the user's home connection in Korea: Blob `icn1` served a 2,101,160-byte file
  in 0.325 seconds. The only Cloudflare path measured, the Worker, was served at
  LAX for all 31 recorded requests (client TCP RTT 130–651 ms) and played 12.84
  of 27.57 video seconds in 44.16 wall seconds. Nobody measured R2 from Korea,
  and a public R2 bucket is delivered by the same Cloudflare edge.
- Capacity: the 23-work catalog delivers 178,693,305 bytes, about 18% of the Hobby
  plan's 1 GB storage.
- No new vendor, subscription, domain or upload tooling is needed; the publish,
  verify and cleanup tools already target Blob.

Blob Hobby terms, re-read on 2026-09-28 from the
[usage and pricing page](https://vercel.com/docs/vercel-blob/usage-and-pricing)
(page dated 2026-09-23):

- Included: 1 GB storage per month, 10 GB Blob data transfer, the first 10,000
  simple operations (URL access on a cache miss) and the first 2,000 advanced
  operations. Edge Requests and Fast Origin Transfer count against the Hobby
  allowances shared by the whole project.
- Over a limit, Hobby users pay nothing, but Blob becomes inaccessible until 30 days
  have passed. Vercel emails as usage nears the limits.

The limit that matters is therefore transfer. At the catalog's mean of about
7.8 MB per work, 10 GB is roughly 1,300 complete plays a month, and exceeding it
would take every video offline for up to 30 days. Watch Blob usage in the Vercel
dashboard's Observability section. If a work starts spreading, or usage passes
about 70% of the allowance, move the team to Pro, which is usage-based with a
monthly credit and spend management. That keeps the same store, URLs and tooling.
The Pro plan's own price and Seoul-region Blob rates were not checked here
[UNCERTAIN]. YouTube embeds remain the zero-cost fallback, at the cost of the
custom player.

The two copies fitted to the Workers 25 MiB limit are unused. Blob keeps the CRF 21
copies, which score higher (Eunseol luma SSIM 0.9818 vs 0.9770).

## R2 implementation follow-through, 2026-09-27

The requested R2 migration keeps the site on Vercel and stages the existing
206,214,333-byte delivery corpus without further encoding. Public-bucket guidance
requires a custom domain for production; `r2.dev` is a development endpoint.
The account UI was inspected: login succeeded, the user deferred R2 subscription
activation, and no Cloudflare domains are registered. Local preparation is not proof
that a bucket exists or that R2 serves the videos.

The [S3 compatibility matrix](https://developers.cloudflare.com/r2/api/s3/api/)
supports object metadata and conditional operations. The project therefore uses
content-hash keys and retains old objects; remote acceptance compares every file's
complete bytes as well as its MIME/length/range behavior. The
[rclone guide](https://developers.cloudflare.com/r2/examples/rclone/) provides an
optional authenticated upload route, but no API credential or rclone remote was
created. Current prepared upload artifacts contain only approved public MP4s.

Outcome remains partial until subscription/domain setup, real uploads, R2 full-hash
verification and production browser acceptance complete. Preparation unit tests
and local hashes do not substitute for those external checks.

## Workers size-limit follow-through, 2026-09-28

Reference: [Workers Static Assets limits](https://developers.cloudflare.com/workers/platform/limits/#static-assets)
specifies 25 MiB per individual asset. The [billing guide](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
describes static-asset hosting separately from R2. Existing Workers sites therefore
do not establish that the account has an active R2 subscription.

Applies to: the current 26 approved portfolio videos. Only Eunseol dance
(34,856,084 bytes) and Delivery (27,672,170 bytes) exceeded that file-size limit.
Decision: tune only those two web copies from their approved originals, retaining
dimensions, audio, frame timing and the existing full-video SSIM minimum of 0.98.

Observation: CRF 23/veryslow produces a 25,822,430-byte Eunseol copy with SSIM
0.981502; CRF 22/slow produces a 24,139,595-byte Delivery copy with SSIM 0.989103.
Full decoding, unchanged source/audio hashes and timestamps, actual Chromium
playback, seeking and six comparison captures passed; sampled frames were inspected.
Evidence: `tmp/video-asset-fit/report.json` and `playback-report.json`.

Conclusion: these two candidates remove the per-file size obstacle for this
specific collection. All 26 prepared deliveries would fit the 25 MiB limit and
total 193,648,104 bytes. This is a measured alternative for the present collection;
the earlier R2 assessment concerned growth beyond the current set. It is not proof
of Cloudflare-hosted playback, a deployed migration or unlimited future capacity.

Follow-through: retain the candidates and their source-bound evidence. The active
Blob catalog, other 24 deliveries and all originals are preserved. R2 subscription
activation remains deferred. Workers deployment and integration of these new
profiles into the publisher were not performed in this two-file preparation task.

## Workers deployment outcome, 2026-09-28

Task 10 integrates the two fitted profiles and uploads all 26 selected files to
a dedicated Worker using existing OAuth. No R2 or paid-plan activation occurred.
The site remains on its previous Blob catalog because continuous playback failed
the release criterion, despite successful initial playback and partial full-byte
verification. No production-cutover claim should be inferred from an upload.

References applied: the [stream API](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/)
supports fixed-length native streams; the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)
can return byte ranges from complete cached responses; [Workers Cache](https://developers.cloudflare.com/workers/cache/configuration/)
places caching before Worker execution. [Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
counts these cache hits at the ordinary Worker request rate. This deployment
therefore uses the account's shared Free request allowance, not unlimited
asset-only request delivery.

Observation: raw Static Assets returned 200/full data for Range and omitted the
expected HEAD length. A manifest-bound handler repaired these protocol behaviors;
native streaming and both cache paths were then tried. On the current network,
full transfers remained variable and slow. A Chromium continuous-play test
reached 12.84 of 27.57 video seconds after 44.16 wall seconds, with seven waiting
events. Worker logs showed normal/low CPU for completed requests. Existing Blob
served the 2,101,160-byte comparison file in 0.325 seconds. Workers requests reached
LAX while the account's existing Pages site reached ICN; routing is a plausible
explanation, not a confirmed diagnosis.

Conclusion: the per-file size obstacle is solved, but Workers hosting is not yet
accepted for this connection. Preserve the active Blob site. A Pages comparison
was considered; the user subsequently accepted the R2 recommendation instead, then
withdrew it the same day (see the 2026-09-28 decision above).
The existing Pages app was read only.
[Pages limits](https://developers.cloudflare.com/pages/platform/limits/) also
allow these individual files, and [Pages serving](https://developers.cloudflare.com/pages/configuration/serving-pages/)
uses native tiered caching. No claim of successful Pages video delivery is made.

## R2 continuation, 2026-09-28 — not adopted

> Not adopted: after review the user decided not to use R2 (decision above).
> Historical record only.

The user had accepted the concrete recommendation to retain the Vercel site and move
only the approved final videos to R2. Rationale: R2 Standard's free storage and
request allowances, no Internet egress charge, and freedom from the static-asset
25 MiB file limit. These are vendor properties, not measured R2 playback results.
The dashboard was revisited and still requires subscription activation, displaying
$0 plus excess usage, automatic renewal and terms acceptance. Action-time
confirmation and a production domain are outstanding. No subscription was added.

Task 11 staged exactly 26 files / 193,648,104 bytes, preserving original approval
hashes and the active 206,214,333-byte Blob publication. The two fitted derivatives
remain bound to their earlier quality/audio/timing report. The other 24 retain the
same delivery hashes. Twenty publication/migration regression checks passed.
Next: establish the approved R2 account/domain, prove uninterrupted full playback
and seeking for Eunseol/Delivery, then validate all 26 hashes before production
activation. No R2 performance or completed migration is claimed.
