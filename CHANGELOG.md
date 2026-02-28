# Changelog

## 2026-02-20

### Completed
- Full portfolio redesign: Dark glow tone -> light minimal tone transition
- Tech stack section removed and replaced with "Things I Want to Say" message section (`#message`)
- Hero/Projects/ProjectCard/Contact/Footer — complete layout/typography/color system overhaul
- Header navigation updated: "Tech Stack" -> "Things I Want to Say"
- Design reference: Clean layout tone inspired by Stripe, Vercel, Framer portfolio templates
- Build verification: `npm run build` passed

## 2026-02-20

### Completed
- Added 5 projects: Make Money, OpenClaw, Mission Control, Saitama Training, Text RPG (total 11)
- Updated existing projects: Baby Care description refresh, Kimchi Premium tech stack+description refresh, Telegram Bot status changed to active
- Hero section: project count 6->11, tech stack 5->10, subtitle changed
- Skills section: added Node.js, Express, SQLite, zustand, pm2

## 2026-02-11

### Completed
- Added OG meta tags (og:title, og:description, og:image, og:url, og:type, twitter:card)
- Added githubUrl data for 6 projects
- Added GitHub icon link to ProjectCard (displayed alongside liveUrl)

### Next
- Replace project screenshots (placeholder -> actual)
- Improve Hero title line break

## 2026-02-08

### Completed
- Project initialization (Vite + React + TS + Tailwind v4 + Framer Motion)
- Hero section (particle background, gradient orb, count-up animation)
- Projects section (6 project cards, category filter, glow effects)
- Skills section (3-column card grid, sequential fade-in)
- Contact section (GitHub + Email links)
- Header (fixed navigation, scroll glassmorphism)
- Footer (vibe-coding credits, back-to-top button)
- Interactive effects (particle background, mouse glow, scroll reveal)
- GitHub Pages deployment (GitHub Actions, `clusteruni-debug/portfolio`)
- Responsive layout (mobile 1-col / tablet 2-col / desktop 3-col)
- Name changed to username (header, Hero, title, meta tags)
- CSS layout bug fix (`* { margin:0 }` reset overriding Tailwind utilities)
- Project card shadow/border visibility improvement
- Tech stack horizontal badges -> 3-column card list layout change

### Deployment
- URL: https://clusteruni-debug.github.io/portfolio/
- Repo: https://github.com/clusteruni-debug/portfolio

### Next
- Replace project screenshots (placeholder -> actual)
- Add OG meta tags
- Improve Hero title line break (word wrapping issue)
