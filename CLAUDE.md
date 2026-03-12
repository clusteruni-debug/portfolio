# Portfolio — Portfolio Showcase Site

## Stack
Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + React Router + Supabase + TipTap

## Running
```bash
npm install
npm run dev       # http://localhost:5110
npm run build     # Production build
```

## Deployment
Vercel (auto-deploy on push)
- GitHub Pages workflow disabled (`.github/workflows/deploy.yml`)
- SPA rewrite via `vercel.json`

## Supabase
- Shares instance `hgygyilcrkygnvaquvko` with X Article Editor
- Env: `.env.local` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- Content managed via X Article Editor using tag conventions

## CMS Tag Convention
| Tag | Purpose |
|-----|---------|
| `portfolio:about` | About page content (single article) |
| `portfolio:blog` | Blog posts (list page) |
| `portfolio:project:{id}` | Project rich description (matches projects.ts id) |

## Routes
```
/           → HomePage (hero + projects + skills + contact)
/about      → AboutPage (CMS or fallback)
/blog       → BlogListPage
/blog/:id   → BlogPostPage
```

## Structure
```
src/
├── App.tsx               # Router + lazy loading
├── data/projects.ts      # 15 project data entries
├── lib/
│   ├── supabase.ts       # Client (null if no env)
│   └── tiptap.ts         # generateHTML renderer
├── hooks/
│   ├── usePortfolioArticles.ts  # Supabase article hooks
│   ├── useScrollProgress.ts
│   └── useInView.ts
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── BlogListPage.tsx
│   └── BlogPostPage.tsx
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, Projects, Skills, Contact
│   ├── ui/               # ProjectCard, BlogCard, TechBadge, GlowCard, AnimatedCounter
│   └── effects/          # ParticleBackground, ScrollReveal, MouseGlow
```

## Verification Checklist
- [ ] tsc -b with no type errors
- [ ] No duplicate project IDs
- [ ] Category filter works (web/tool/bot)
- [ ] Blog/About pages render without .env.local (graceful degradation)

## Next TODO
1. Improve Hero title line break (prevent word split)
2. Replace project screenshots (public/screenshots/)
3. Mobile responsive check (375px)
4. Vercel project setup + first deploy

## References
- CC/CX file ownership: agent_docs/domain-map.md
