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

<!-- BEGIN: WORKSPACE_POLICY_INHERITANCE -->
## Workspace Policy Inheritance

Git/commit/push, task/lock, review, and handoff rules come from root
`AGENTS.md`; project rules only add stricter local constraints.
<!-- END: WORKSPACE_POLICY_INHERITANCE -->
