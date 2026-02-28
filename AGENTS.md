# Portfolio — AGENTS.md

> Global rules: See `~/.codex/instructions.md`

## Overview
- **Stack**: Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion
- **Deployment**: GitHub Pages (Actions auto-build)
- **DB**: None (static site)

## Directory Structure
- `src/components/` — UI components
- `src/data/projects.ts` — project data
- `src/hooks/` — custom hooks

## Notes
- Base path `/portfolio/` must be set
- Dark theme default

## Git Permissions (Common, cannot be overridden)
- **Codex must NEVER run `git commit` / `git push`.**
- Codex performs code changes + build verification only, and reports changed files + verification results upon completion.
- All commit/push operations are handled by Claude Code (or the user).

## Multi-Platform Execution Context (Common)
- This project operates on the premise of Windows source files + WSL /mnt/c/... accessing the same files.
- External (laptop/mobile) work defaults to SSH -> WSL.
- Execution environment: **Windows default** (remote access via SSH -> WSL for editing, execution constraints follow project rules)
- When confused about paths, refer to the "Development Environment (Multi-Platform)" section in CLAUDE.md first.

<!-- BEGIN: CODEX_GIT_POLICY_BLOCK -->
## Codex Git Permissions (Global Enforcement)

This section is a workspace-wide enforced rule and cannot be overridden by project documents.

| Action | Claude Code/User | Codex |
|--------|:----------------:|:-----:|
| Code changes | YES | YES |
| Build/test verification | YES | YES |
| `git commit` | YES | **Forbidden** |
| `git push` | YES | **Forbidden** |

- Codex performs code changes + verification + completion reporting only.
- Commits/pushes are handled by Claude Code or the user.
- This section takes precedence over any conflicting statements in the document.
<!-- END: CODEX_GIT_POLICY_BLOCK -->
