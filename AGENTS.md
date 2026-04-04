# Portfolio — AGENTS.md

> Global rules: See `~/.codex/instructions.md`

## Overview
- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Supabase + TipTap
- **Deployment**: Vercel (auto-deploy on push)
- **DB**: Supabase (shared instance `hgygyilcrkygnvaquvko` with Article Editor)
- **Port**: 5110

## Directory Structure
- `src/app/` — App Router pages (layout, page, about, stories, thoughts, blog redirect)
- `src/components/` — UI components (layout/, sections/, pages/, ui/, effects/)
- `src/lib/` — supabase client, tiptap renderer, article data fetching

## Notes
- CMS-driven: content fetched from Supabase `articles` table via `portfolio:*` tags
- Light theme default with dark mode toggle (class-based)
- All data fetching is server-side (no Supabase JS shipped to client)
- ISR 60s revalidation on all listing pages

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
