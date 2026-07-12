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
<!-- BEGIN: WORKSPACE_POLICY_INHERITANCE -->
## Workspace Policy Inheritance

Git/commit/push, task/lock, review, and handoff rules come from root
`AGENTS.md`; project rules only add stricter local constraints.
<!-- END: WORKSPACE_POLICY_INHERITANCE -->
