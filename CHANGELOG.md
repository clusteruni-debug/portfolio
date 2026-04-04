# Changelog

## 2026-04-05

### Tech Debt Audit (full-sweep)
- AGENTS.md/CLAUDE.md/README.md rewritten — all referenced stale Vite-era stack
- `<img>` → `next/image` with Supabase remotePatterns (3 pages + StoryCard)
- Inline SVG → `lucide-react` (Header: Menu/X, ThemeToggle: Sun/Moon)
- StoryCard hover: translate-y/scale/shadow → border-color only (workspace design rule)
- Noto Sans KR: `<link>` tag → `next/font/google` CSS variable
- CSS hardcoded hex in `pre` blocks → CSS variables (`--code-bg`, `--code-text`)
- `NEXT_PUBLIC_` env vars → server-only with fallback
- ESLint flat config created (`eslint.config.mjs`)
- Inter font applied to headings (was declared but never used in CSS)
- `metadataBase` added for OG image resolution
- `sitemap.ts` + `robots.ts` added for SEO
- `.gitignore` Vite remnants removed
- React 19 lint compliance: Header useEffect→onClick, ThemeToggle→useSyncExternalStore

## 2026-03-29

### Maintenance
- Added `next-env.d.ts` to `.gitignore`

## 2026-03-13

### Redesign — Tech Showcase to Story-Driven Personal Site
- Complete identity shift: tech portfolio → "만들고 쓰고 기록하는 사람"
- New sections: IntroSection, FeaturedStoriesSection, LatestThoughtsSection, AboutTeaserSection
- Components: StoryCard, ThoughtCard, ScrollReveal, FadeIn
- Design system: warm neutral (cream bg, stone text, amber accent), dark mode toggle
- Typography: Inter (headings) + Noto Sans KR (body), 18px base, serif for blockquotes
- CMS content rendering via TipTap `generateHTML` (server-side)
- All pages have `generateMetadata()` for SEO

## 2026-03-12

### Architecture Migration
- **Vite SPA → Next.js 16 App Router** — full rewrite
- **CMS integration**: Supabase `articles` table via `portfolio:*` tag convention
- **Deployment**: GitHub Pages → Vercel (auto-deploy on push)
- **Routing**: ISR 60s for listings, dynamic SSR for detail pages
- `/blog/*` → `/thoughts/*` redirect for SEO continuity
- Server-side data fetching only (no Supabase JS shipped to client)
- Added `.vercel` to `.gitignore`

## 2026-02-20

### Completed
- Full portfolio redesign: Dark glow tone -> light minimal tone transition
- Tech stack section removed and replaced with "Things I Want to Say" message section (`#message`)
- Hero/Projects/ProjectCard/Contact/Footer — complete layout/typography/color system overhaul
- Header navigation updated: "Tech Stack" -> "Things I Want to Say"
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

## 2026-02-08

### Initial Release
- Project initialization (Vite + React + TS + Tailwind v4 + Framer Motion)
- Hero section, Projects section (6 cards), Skills section, Contact section
- Header (fixed navigation, scroll glassmorphism), Footer
- GitHub Pages deployment (`clusteruni-debug/portfolio`)
- Responsive layout (mobile/tablet/desktop)
