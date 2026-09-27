# Video collection intake

Run this entry point before collecting a requested corpus or changing the gallery.
The 2026-09-27 request meant prompt-generated Topview, DomoAI and Pollo works;
the previous 56 channel episodes were the wrong corpus. Requested providers are
explicit arguments, not inferred from whatever files happen to be present.

```powershell
python -X utf8 scripts/video-intake.py --require-providers topview domoai pollo
```

The read-only report lists provider counts and actual examples (one per requested
provider first, at least three when available). Each example includes the existing
file, provenance and verified SHA-256. Show these examples when the requested
corpus is ambiguous, before UI implementation. If the user already clarified the
corpus, reuse that instruction; this command does not add a new approval gate.

A missing requested provider is `BLOCKED` with exit code 2, even when other
providers have many works. Wrong source directories, stale media approval and
candidate metadata that differs from the explicit approved selection also block.
`own-x` archival selections use the recorded provider metadata because historical
folder names can differ; this check does not infer authorship from file names.
The source corpus remains `C:/vibe/projects/ai-video-hustle/productions`.

Use the same entry point for a local refresh after checking the report:

```powershell
python -X utf8 scripts/video-intake.py --require-providers topview domoai pollo --sync --copy-media
```

Only `PASS` invokes the existing `sync-videos.py`; importer failures propagate.
`--selection path/to/candidate.json` checks a candidate list without modifying
the approved selection and cannot be combined with `--sync` for a different file.
New works must first follow the explicit selection process in [videos.md](videos.md).

This wrapper does not publish, deploy, alter originals, classify every archive
file, or prove visual quality. The old importer remains directly callable:
enforcement applies to this entry point, not every possible import command.
Source/provenance existence and matching bytes support selection evidence; they
do not independently prove the historical provider attribution.

Regression checks:

```powershell
python -X utf8 -m unittest discover -s tests -p test_video_intake.py -v
```

These exercise a mislabeled channel corpus, omitted Pollo, forged provider
metadata, changed source bytes, path escape, archive exceptions, three actual
source-bound examples, and importer launch/failure propagation. No UI changed.
