# Portfolio — AGENTS.md

> Global rules: see workspace root `AGENTS.md` and `config/codex-global/RUNTIME-CONTRACT.md`.

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
- Follow workspace root `AGENTS.md` section 3 and section 16 for Codex git permissions.
- Codex may create a local commit only through the root gated commit flow; `git push` remains forbidden.
- Task-specific review-only scopes may be stricter, but this project file must not globally override the root table.
## Multi-Platform Execution Context (Common)
- This project operates on the premise of Windows source files + WSL /mnt/c/... accessing the same files.
- External (laptop/mobile) work defaults to SSH -> WSL.
- Execution environment: **Windows default** (remote access via SSH -> WSL for editing, execution constraints follow project rules)
- When confused about paths, refer to the "Development Environment (Multi-Platform)" section in CLAUDE.md first.

<!-- BEGIN: CODEX_GIT_POLICY_BLOCK -->
## Codex Git Permissions (Workspace Policy)

Project-local rules inherit root `AGENTS.md` section 3 and section 16.

| Action | Claude Code/User | Codex |
| --- | :---: | :---: |
| Code modification | yes | yes |
| Build/test verification | yes | yes |
| `git commit` | yes | gated local only |
| `git push` | yes | forbidden |

- Codex may create a local commit only when the root workspace Codex commit gate passes for the task.
- Codex never pushes. Claude Code or the user handles push and integration ownership.
- If this project needs stricter review-only behavior for a task, state it in that task's scope; otherwise root policy wins.
<!-- END: CODEX_GIT_POLICY_BLOCK -->
