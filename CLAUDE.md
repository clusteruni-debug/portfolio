# Portfolio — Portfolio Showcase Site

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
| `portfolio:blog` | Blog posts (list page) |
| `portfolio:project:{id}` | Project rich description (matches projects.ts id) |

## Routes (App Router)
```
/             → Static (hero + projects + skills + contact)
/about        → ISR 60s (CMS or fallback)
/blog         → ISR 60s (blog list)
/blog/[id]    → Dynamic SSR (individual post with generateMetadata for SEO)
/not-found    → 404 page
```

## SEO
- Blog posts have per-page `generateMetadata()` (title, description, OG image)
- Content rendered server-side as HTML (TipTap generateHTML on server)
- ISR with 60s revalidation for fresh content

## Structure
```
src/
├── app/
│   ├── layout.tsx            # Root layout (Header + Footer + fonts)
│   ├── page.tsx              # Home (server → fetches project descriptions)
│   ├── about/page.tsx        # About (server → fetches CMS content)
│   ├── blog/page.tsx         # Blog list (server → fetches articles)
│   ├── blog/[id]/page.tsx    # Blog post (server → SSR with metadata)
│   ├── not-found.tsx         # 404
│   ├── error.tsx             # Error boundary
│   └── globals.css
├── components/
│   ├── layout/               # Header, Footer (client)
│   ├── sections/             # Hero, Projects, Skills, Contact (client)
│   ├── pages/                # HomePage, AboutContent (client wrappers)
│   ├── ui/                   # ProjectCard, BlogCard, TechBadge, etc.
│   └── effects/              # ScrollReveal, FadeIn, ParticleBackground, MouseGlow
├── data/projects.ts          # 15 project data entries
├── lib/
│   ├── supabase.ts           # Server-side client
│   ├── tiptap.ts             # Server-side HTML renderer
│   └── articles.ts           # Server-side data fetching
└── hooks/                    # useScrollProgress, useInView (client)
```

## Verification Checklist
- [ ] `npm run build` with no errors
- [ ] No duplicate project IDs
- [ ] Category filter works (web/tool/bot)
- [ ] Blog/About pages render without .env.local (graceful degradation)

## References
- CC/CX file ownership: agent_docs/domain-map.md
