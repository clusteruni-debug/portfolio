# AGENT_TASK_BOARD

Created: 2026-05-22
Purpose: prevent task duplication between AI/LLM agents and enable conflict-free parallel work
Scope: project:portfolio
Generated-by: scripts/extract-project-board.py

## Operating Policy
- Board is maintained.
- Records require minimum fields only: `TASK-ID`, `Owner-Agent`, `Status`, `Scope-Files`.
- Workspace-scope tasks stay in the root board; project-scope tasks live in `projects/<slug>/AGENT_TASK_BOARD.md` when present.

## Task Board
### Active Tasks - project:portfolio
| TASK-ID | Owner-Agent | Status | Scope-Files | Notes | Change-Type |
|---------|-------------|--------|-------------|-------|-------------|
| PORTFOLIO-VIDEO-DELETE-20260928-13 | claude-code | done | tmp/video-workers-migration;tmp/video-r2-migration;tmp/video-asset-fit;docs/deploy.md;docs/videos.md;docs/reference/vercel-video-delivery.md;AGENT_TASK_BOARD.md | User approved the cleanup on 2026-09-28. Done: Worker portfolio-videos deleted 17:26 +0900 (Cloudflare API code 10007 afterwards); 250 local files (1,418,068,636 bytes) removed, each MP4 hash-proven to have a copy in tmp/video-delivery or public/videos/media (28 copies re-hashed after); evidence files and one copy-less trial encode kept. Blob preflight passed at 17:14 (store = 23 active + 3 targets exactly; production pages do not use the 3 URLs; local copies hash-match). The auto-mode guard blocked CC from deleting the 3 withdrawn Blob objects, so the user ran the prepared one-off at 18:34 +0900: 3 deleted by exact URL + ETag (27,521,028 bytes), store = 23 objects / 178,693,305 bytes, all 3 URLs 404 within ~65 s (CDN purge); receipts in tmp/video-cleanup/2026-09-28T09-34-41-004Z-withdrawn-delete. After: publish --check 23/23; production pages 200. Record commits 1bb2617 and the closing commit of this row. | ops |

### Active File Locks
<!-- 1 codex tasks transitioned review -> done at 2026-07-23T16:09:41+09:00: PORTFOLIO-AUDIT-M8-DOC-SYNC-20260722-01 -->
| File Path | Locked By | TASK-ID | Locked At | Release Condition |
|-----------|-----------|---------|-----------|-------------------|
