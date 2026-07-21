# Portfolio — CC/CX File Ownership

## Current Shape

Portfolio is a Next.js App Router site. Published content is read server-side
from the shared Supabase `articles` table; `portfolio:*` tags are the content
and routing contract. There is no repository-local `src/data/projects.ts`.

| Domain | File/Directory | Default Owner | Rationale |
|--------|---------------|:-------------:|-----------|
| App Routes and UI | `src/app/**` except `src/app/api/**`, `src/components/**` | CX | CMS-driven pages, metadata, redirects, layout, visual presentation, and motion |
| CMS Reads and Rendering | `src/lib/**` | CX | Server-side Supabase queries and TipTap JSON-to-HTML rendering; schema/security contracts route to CC |
| Revalidation API | `src/app/api/revalidate/route.ts` | CC | `REVALIDATION_SECRET`-protected cache mutation and request contract |
| Build, Deploy, and Project Docs | `package.json`, `next.config.ts`, `docs/deploy.md`, `CLAUDE.md`, `AGENTS.md` | CX | Vercel deployment, port/build metadata, and project guidance |

> CC owns architecture plus auth, request-contract, shared-schema, and security-boundary changes; bounded page, render, query, and documentation work follows the table above.

## Review Boundaries

- Page and visual changes stay in `src/app/**` and `src/components/**` and should preserve the current App Router + Vercel deployment path.
- Portfolio content is selected from the shared Supabase `articles` table by `portfolio:*` tags in `src/lib/articles.ts`; preserve that tag contract across queries, cards, routes, and sitemap generation.
- `src/app/api/revalidate/route.ts` is a secret-gated API boundary. Preserve secret validation, path validation, and the 20-path limit; authentication, request-contract, RLS, or shared Supabase schema changes require the root approval and consumer-review gates.
- Build/deploy metadata belongs in `docs/deploy.md` and `config/projects.json`, not in component comments.
- Portfolio consumes the Article Editor Supabase instance but does not own that shared schema; keep schema facts in `docs/data-schema.md` and verify them before changing data contracts.
- Use focused static checks for copy/data changes and the configured project verification command for UI or build-affecting changes.
