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
- Env: `.env.local` (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
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
/stories/[slug]     → Dynamic SSR (individual case study)
/thoughts           → ISR 60s (thought listing, merges portfolio:thought + portfolio:blog)
/thoughts/[id]      → Dynamic SSR (individual thought piece)
/blog/*             → Redirect to /thoughts/* (SEO continuity)
```

## Design System
- **Tone**: Warm neutral (cream #faf8f5 bg, stone text, amber accent)
- **Dark mode**: Class-based (.dark on html), localStorage + prefers-color-scheme
- **Typography**: Inter (headings) + Noto Sans KR (body), 18px base, 1.8 line-height
- **Serif**: Georgia / Noto Serif KR for blockquotes (var(--serif))
- **No**: gradient-text, glass, glow, particle effects, tech badges

## SEO
- All content pages have `generateMetadata()` (title, description, OG image)
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
│   ├── stories/[slug]/page.tsx # Story detail (server → SSR with metadata)
│   ├── thoughts/page.tsx       # Thoughts listing (server)
│   ├── thoughts/[id]/page.tsx  # Thought detail (server → SSR with metadata)
│   ├── blog/[[...slug]]/page.tsx # Redirect → /thoughts/*
│   ├── not-found.tsx           # 404
│   ├── error.tsx               # Error boundary
│   └── globals.css             # Color system (CSS vars, dark mode)
├── components/
│   ├── layout/                 # Header (with ThemeToggle), Footer
│   ├── sections/               # IntroSection, FeaturedStoriesSection,
│   │                           # LatestThoughtsSection, AboutTeaserSection
│   ├── pages/                  # HomePage, AboutContent
│   ├── ui/                     # ThemeToggle, StoryCard, ThoughtCard
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
