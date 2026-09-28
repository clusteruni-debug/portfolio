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

## Video publication
- Follow `docs/videos.md`: publish only explicitly selected final files with matching `approvedSha256` values in `src/data/video-selection.json`.
- Do not infer a final cut from modification time, a `final` filename, or a recursive MP4 scan. Resolve ambiguous takes with the user before publishing.
- Replace the existing work ID for a revised final cut; preserve source originals. A changed hash requires a new playback URL.
- Public uploads and deployment need authorization. Never publish unresolved local preview URLs.
- A work needs positive evidence of being a finished piece: user confirmation, a user post, or a production record naming it the lineage's finished deliverable. A failed or abandoned lineage or a one-off test stays out unless the user confirms it.
- Video hosting is Vercel Blob. Cloudflare R2 and Workers were evaluated and are not adopted (user decision 2026-09-28); do not resume either without a new user request.
- Production builds from Git pushes to `master`. Commit catalog and gallery changes before any push; a CLI deploy of uncommitted files is replaced by the next push (the 2026-09-28 outage).

<!-- BEGIN: WORKSPACE_POLICY_INHERITANCE -->
## Workspace Policy Inheritance

Git/commit/push, task/lock, review, and handoff rules come from root
`AGENTS.md`; project rules only add stricter local constraints.
<!-- END: WORKSPACE_POLICY_INHERITANCE -->
