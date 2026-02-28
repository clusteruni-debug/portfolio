# Portfolio — Portfolio Showcase Site

## Stack
Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion

## Running
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build
```

## Deployment
GitHub Pages (GitHub Actions auto-build), `git push` = auto deploy
URL: https://clusteruni-debug.github.io/portfolio/

## Structure
```
src/
├── App.tsx             # Root (5 sections)
├── data/projects.ts    # 11 project data entries
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, Projects, Skills, Contact
│   ├── ui/             # ProjectCard, TechBadge, GlowCard, AnimatedCounter
│   └── effects/        # ParticleBackground, ScrollReveal, MouseGlow
└── hooks/              # useScrollProgress, useInView
```

## Verification Checklist
- [ ] tsc -b with no type errors
- [ ] No duplicate project IDs
- [ ] Category filter works (web/tool/bot)

## Next TODO
1. Improve Hero title line break (prevent word split)
2. Replace project screenshots (public/screenshots/)
3. Mobile responsive check (375px)

## References
- CC/CX file ownership: agent_docs/domain-map.md
