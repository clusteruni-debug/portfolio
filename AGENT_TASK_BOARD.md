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
| PORTFOLIO-AUDIT-M8-DOC-SYNC-20260722-01 | codex | done | projects/portfolio/agent_docs/domain-map.md;projects/portfolio/CLAUDE.md | Checkpoint 32afcba; STATIC-ONLY build/lint/domain-map/diff passed; independent review pending; nested-repo closeout attribution bug recorded. | docs-only |

### Active File Locks
<!-- 1 codex tasks transitioned review -> done at 2026-07-23T16:09:41+09:00: PORTFOLIO-AUDIT-M8-DOC-SYNC-20260722-01 -->
| File Path | Locked By | TASK-ID | Locked At | Release Condition |
|-----------|-----------|---------|-----------|-------------------|
