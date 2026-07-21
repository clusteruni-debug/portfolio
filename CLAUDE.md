# Portfolio — Story-Driven Personal Site

> Identity: "만들고 쓰고 기록하는 사람" — observer/documenter, not tech showcase

## Stack
Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + Framer Motion + Supabase + TipTap

## Running
```bash
npm install
npm run dev       # http://localhost:5110
npm run build     # Production build
npm start         # Production server (port 5110)
```

## Deployment
Vercel (auto-deploy on push)
- GitHub Pages workflow disabled (`.github/workflows/deploy.yml`)

## Supabase
- Shares instance `hgygyilcrkygnvaquvko` with X Article Editor
- Env: `.env.local` (`SUPABASE_URL` / `SUPABASE_ANON_KEY`, with `NEXT_PUBLIC_*` fallbacks; `REVALIDATION_SECRET` for `/api/revalidate`)
- All data fetching is server-side (no Supabase JS shipped to client)

## CMS Tag Convention
| Tag | Purpose |
|-----|---------|
| `portfolio:about` | About page content (single article) |
| `portfolio:thought` | Thought pieces (list at /thoughts) |
| `portfolio:blog` | Legacy blog posts (still rendered, redirected to /thoughts) |
| `portfolio:story:{slug}` | Case studies (e.g., `portfolio:story:navigator`) |
| `portfolio:featured` | Featured on home page |

## Routes (App Router)
```
/                   → ISR 60s (intro + featured stories + latest thoughts + about teaser)
/about              → ISR 60s (CMS or fallback)
/stories            → ISR 60s (case study listing)
/stories/[slug]     → Dynamic ISR 60s (individual case study)
/thoughts           → ISR 60s (thought listing, merges portfolio:thought + portfolio:blog)
/thoughts/[id]      → Dynamic ISR 60s (individual thought piece)
/blog/*             → Redirect to /thoughts/* (SEO continuity)
POST /api/revalidate → Secret-protected on-demand path revalidation
```

## Design System
- **Tone**: Warm neutral (cream #faf8f5 bg, stone text, amber accent)
- **Dark mode**: Class-based (.dark on html), localStorage + prefers-color-scheme
- **Typography**: Inter (headings) + Noto Sans KR (body), 18px base, 1.8 line-height
- **Handwritten accent**: Caveat for short Latin greetings, signatures, and section eyebrows only (no Hangul glyphs)
- **Serif**: Georgia / Noto Serif KR for blockquotes (var(--serif))
- **No**: gradient-text, glass, glow, particle effects, tech badges

## SEO
- Root metadata lives in `layout.tsx`; list pages export static metadata and dynamic detail pages use `generateMetadata()`
- Content rendered server-side as HTML (TipTap generateHTML on server)
- ISR with 60s revalidation for fresh content
- /blog/* redirects preserve SEO continuity

## Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (dark mode script, Header + Footer)
│   ├── page.tsx                # Home (server → featured stories + latest thoughts)
│   ├── about/page.tsx          # About (server → CMS content)
│   ├── stories/page.tsx        # Stories listing (server)
│   ├── stories/[slug]/page.tsx # Story detail (server → ISR 60s with metadata)
│   ├── thoughts/page.tsx       # Thoughts listing (server)
│   ├── thoughts/[id]/page.tsx  # Thought detail (server → ISR 60s with metadata)
│   ├── blog/[[...slug]]/page.tsx # Redirect → /thoughts/*
│   ├── api/revalidate/route.ts    # Secret-gated on-demand path revalidation
│   ├── robots.ts                  # Robots metadata route
│   ├── sitemap.ts                 # CMS-backed sitemap metadata route
│   ├── not-found.tsx           # 404
│   ├── error.tsx               # Error boundary
│   └── globals.css             # Color system (CSS vars, dark mode)
├── components/
│   ├── layout/                 # Header (with ThemeToggle), Footer
│   ├── sections/               # IntroSection, FeaturedStoriesSection,
│   │                           # LatestThoughtsSection, AboutTeaserSection
│   ├── pages/                  # HomePage, AboutContent
│   ├── ui/                     # Avatar, EmptyState, ThemeToggle, StoryCard, ThoughtCard
│   └── effects/                # ScrollReveal, FadeIn
└── lib/
    ├── supabase.ts             # Server-side client
    ├── tiptap.ts               # Server-side HTML renderer
    └── articles.ts             # Data fetching (stories, thoughts, about)
```

## Verification Checklist
- [ ] `npm run build` with no errors
- [ ] Dark mode toggle works, no flash on reload
- [ ] /blog/* redirects to /thoughts/*
- [ ] Stories/Thoughts render from CMS
- [ ] All pages degrade gracefully without .env.local

## References
- CC/CX file ownership: agent_docs/domain-map.md

## Reference Ledger
Web-research facts for this project accumulate in `docs/reference/`. Before re-fetching an
external source, run `python -X utf8 scripts/check-web-reference-ledger.py --query "<topic>"`
from the workspace root and prefer an existing doc whose `last_verified` is current; after
research that changes code or decisions, persist a doc with `last_verified` / `sources` /
`reliability` (primary | vendor-doc | analyst | secondary) frontmatter. Full rule + helpfulness
scoring: root CLAUDE.md "Web Research — Reference Ledger".
