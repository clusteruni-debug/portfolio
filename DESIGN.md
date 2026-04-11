# Portfolio — DESIGN.md

> Last updated: 2026-04-11
> Persona: product-landing + editorial — "observer / documenter"
> Stack: Next.js 16 + React 19 + Tailwind v4 + Framer Motion + TipTap + Supabase

## Identity

Portfolio's defining choice is the **triple-register typography** — Inter (sans) for scannable headings, Noto Sans KR for Korean body reading, Georgia + Noto Serif KR for blockquote emphasis — wrapped in a warm neutral palette (cream background + stone text + amber-brass accent) that intentionally refuses the typical "tech portfolio" aesthetic. There is no gradient text, no glass blur, no glow, no particle effects, no skill badges. The site exists to say "만들고 쓰고 기록합니다" (I make, write, and record), and every design decision subtracts noise around that sentence. Framer Motion provides a three-speed motion scale (fast/base/slow) for section reveals and fade-ins — never for decoration.

## 1. Color Palette (3-layer token architecture)

Three layers: **primitive** (raw values, mode-agnostic) → **semantic** (purpose aliases, owns light/dark variants) → **component** (component-specific, inherits semantic). Never reference primitives directly inside components — always go through semantic.

### Primitive (raw hex — mode-agnostic)

| Token | Value | Notes |
|---|---|---|
| `--color-cream-50` | `#faf8f5` | Warm paper background (light mode canvas) |
| `--color-cream-100` | `#f3f0eb` | Subtle panel / code inline bg (light) |
| `--color-white` | `#ffffff` | Elevated surface (cards, light) |
| `--color-stone-50` | `#fafaf9` | Dark-mode primary text |
| `--color-stone-200` | `#e7e5e4` | Light-mode border |
| `--color-stone-400` | `#a8a29e` | Dark-mode secondary text |
| `--color-stone-500` | `#78716c` | Meta/subtle text (both modes — intentionally shared) |
| `--color-stone-700` | `#44403c` | Light-mode secondary text, dark-mode border |
| `--color-stone-800` | `#292524` | Dark-mode surface elevated + muted bg |
| `--color-stone-900` | `#1c1917` | Light-mode primary text, dark-mode canvas |
| `--color-amber-400` | `#fbbf24` | Dark-mode accent (brighter for low-light contrast) |
| `--color-amber-800` | `#92400e` | Light-mode accent (brass/warm) |
| `--color-slate-200` | `#e2e8f0` | Code block text |
| `--color-slate-800` | `#1e293b` | Code block bg (light mode) |
| `--color-stone-950` | `#0c0a09` | Code block bg (dark mode — near black) |
| `--color-red-500` | `#ef4444` | Reserved for `--color-danger` (state layer only) |
| `--color-emerald-500` | `#10b981` | Reserved for `--color-success` |
| `--color-blue-500` | `#3b82f6` | Reserved for `--color-info` |
| `--color-yellow-500` | `#f59e0b` | Reserved for `--color-warning` |

### Semantic (purpose aliases — owns light/dark variants)

Light values are declared at `:root`. Dark overrides are injected via `html.dark { ... }` (class-based, not media-query — see Section 6).

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--color-background` | `var(--color-cream-50)` | `var(--color-stone-900)` | App canvas |
| `--color-surface` | `var(--color-white)` | `var(--color-stone-800)` | Elevated (cards, panels) |
| `--color-surface-muted` | `var(--color-cream-100)` | `var(--color-stone-800)` | Inline code, subtle panels |
| `--color-foreground` | `var(--color-stone-900)` | `var(--color-stone-50)` | Primary text |
| `--color-foreground-muted` | `var(--color-stone-700)` | `var(--color-stone-400)` | Secondary text |
| `--color-foreground-subtle` | `var(--color-stone-500)` | `var(--color-stone-500)` | Meta/captions (intentionally same in both modes) |
| `--color-border` | `var(--color-stone-200)` | `var(--color-stone-700)` | Dividers, card borders |
| `--color-accent` | `var(--color-amber-800)` | `var(--color-amber-400)` | Brand accent (brass warmth) |
| `--color-focus-ring` | `var(--color-amber-800)` | `var(--color-amber-400)` | Focus indicator |
| `--color-code-bg` | `var(--color-slate-800)` | `var(--color-stone-950)` | Code block surface |
| `--color-code-text` | `var(--color-slate-200)` | `var(--color-slate-200)` | Code block text |
| `--color-success` | `var(--color-emerald-500)` | `var(--color-emerald-500)` | Positive outcome |
| `--color-danger` | `var(--color-red-500)` | `var(--color-red-500)` | Error / destructive |
| `--color-warning` | `var(--color-yellow-500)` | `var(--color-yellow-500)` | Caution |
| `--color-info` | `var(--color-blue-500)` | `var(--color-blue-500)` | Neutral info |

Note: state colors (success/danger/warning/info) are currently **unused in the UI** — Portfolio has no form error states, no toast system, no dashboard alerts. They exist for (a) the Agent Prompt Guide so future AI-assisted features have tokens to reach for, and (b) the `tiptap.ts:12` render-error fallback message (currently hardcoded — see Appendix follow-up).

### Component (component-specific — inherits semantic)

| Token | Value | Used by |
|---|---|---|
| `--shadow-soft` | `0 18px 44px rgba(28, 25, 23, 0.06)` (light) / `0 18px 44px rgba(0, 0, 0, 0.2)` (dark) | Cards, StoryCard, ThoughtCard |
| `--article-body-font` | `var(--font-noto-sans-kr), Georgia, serif` | `.article-content` base |
| `--article-body-size` | `17px` | `.article-content` paragraph |
| `--article-body-leading` | `1.85` | `.article-content` paragraph |
| `--article-h1-size` | `28px` | `.article-content h1` |
| `--article-h2-size` | `22px` | `.article-content h2` |
| `--article-h3-size` | `18px` | `.article-content h3` |
| `--blockquote-border` | `3px solid var(--color-border)` | `.article-content blockquote` left rule |
| `--blockquote-font` | `var(--serif)` | `.article-content blockquote` (Georgia + Noto Serif KR) |

### Legacy aliases (brownfield migration)

Portfolio's original `:root` exposed flat semantic names directly (`--bg-primary`, `--text-primary`, `--accent`, etc.) and layout.tsx uses `bg-[var(--bg-primary)]` as a Tailwind arbitrary-value pattern. Renaming would require editing every consumer; instead, the refactor preserves original names as aliases pointing at the primitive layer so existing arbitrary-value utilities, article-content styles, and ThemeToggle continue to work.

| Legacy token | Points to | Reason for retention |
|---|---|---|
| `--bg-primary` | `var(--color-background)` | `layout.tsx:47` uses `bg-[var(--bg-primary)]` |
| `--bg-secondary` | `var(--color-surface)` | Card + panel references |
| `--bg-muted` | `var(--color-surface-muted)` | `.article-content code` background |
| `--text-primary` | `var(--color-foreground)` | `layout.tsx:47` + body + article-content h1-h3 |
| `--text-secondary` | `var(--color-foreground-muted)` | Multiple sections (Header, Footer, listings) |
| `--text-subtle` | `var(--color-foreground-subtle)` | blockquote, strikethrough, caption meta |
| `--accent` | `var(--color-accent)` | Article internal links, ThemeToggle |
| `--border` | `var(--color-border)` | `.article-content hr`, blockquote border |
| `--shadow-soft` | (component layer) | Card shadow — legacy name = component name |
| `--serif` | `Georgia, 'Noto Serif KR', serif` | `.article-content blockquote` font family (kept literal, not re-aliased, because it's a font-family stack not a color) |
| `--code-bg` | `var(--color-code-bg)` | `.article-content pre` background |
| `--code-text` | `var(--color-code-text)` | `.article-content pre` text |

Legacy aliases are a migration bridge. Do NOT use them in new code.

## 2. Typography

### Font strategy decision

**Triple-register (sans headings + sans body + serif quotes)** — deliberate and central to Portfolio's identity. Each register has a justified purpose:

- **Inter** (Latin sans): headings h1–h6. Rationale: Inter is highly scannable, optically tuned for Western screens, and establishes a clear "modern editorial" tone distinct from decorative display faces. Applied via hardcoded `h1, h2, h3, h4, h5, h6 { font-family: var(--font-inter), ... }` in globals.css.
- **Noto Sans KR** (Korean sans): body text, UI, article body. Rationale: Korean is the primary content language ("기록하는 사람"). Noto Sans KR is explicitly hangul-optimized without the typical stroke-width inconsistency of system Korean fallbacks. 18px base / 1.8 line-height is intentionally generous for reading comfort.
- **Georgia + Noto Serif KR** (serif): blockquotes only. Rationale: quoted thoughts deserve visual distinction from the surrounding body; a serif lends editorial weight, and Georgia + Noto Serif KR ensures the serif register works for both Latin and Korean script. Restricted to `.article-content blockquote` — NEVER use elsewhere.

Triple-register is a known maintenance cost (three font loads + careful scoping rules) but it is the single biggest carrier of Portfolio's identity. Do not collapse.

### Font stack

- **Display / Heading (h1..h6)**: `var(--font-inter), 'Apple SD Gothic Neo', sans-serif`
- **Body / UI**: `var(--font-noto-sans-kr), 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`
- **Article body**: `var(--font-noto-sans-kr), Georgia, serif` — falls back to serif if KR font fails to load (rare)
- **Blockquote (article-only)**: `var(--serif)` = `Georgia, 'Noto Serif KR', serif`
- **Code**: system monospace (no custom font — code is secondary content, not an identity element)

Loaded via `next/font/google` in `layout.tsx` with `display: 'swap'`, pre-hydration, CSS variable binding. No custom font files.

Avoided intentionally: Roboto (too generic), Helvetica (cold + dated), Inter-for-body (Korean handling is weak), Apple SD Gothic Neo (macOS-only). The triple-register is the intentional choice.

### Hierarchy

| Role | Size | Weight | Line height | Letter spacing | Usage |
|---|---|---|---|---|---|
| Display | 48px | 700 | 1.15 | -0.02em | Hero headline (IntroSection) |
| Page title (H1) | 32px | 700 | 1.2 | -0.01em | Stories/Thoughts listing page title |
| Article H1 | 28px | 700 | 1.3 | 0 | Story/Thought detail — top heading |
| Section title (H2) | 22px | 600 | 1.35 | 0 | Section headers inside a page |
| Subsection (H3) | 18px | 600 | 1.4 | 0 | In-article subheadings |
| Body (base) | 18px | 400 | 1.8 | 0 | Paragraphs, UI text, listings |
| Article body | 17px | 400 | 1.85 | 0 | `.article-content` paragraph — slightly denser for long reads |
| Listing meta | 16px | 400 | 1.5 | 0 | Story/Thought card meta (date, tag) |
| Caption | 14px | 500 | 1.4 | 0 | Footer, timestamps |
| Code | 14px | 400 | 1.6 | 0 | Inline code + code blocks |

Display and page-title sizes are not currently present in `.article-content` — they belong to non-article pages (home, listings). Add them as page-level Tailwind class utilities; they do NOT get per-element CSS rules because article-content deliberately owns its own sub-hierarchy.

## 3. Component States

Portfolio is a **read-first site** — most interaction is tap-to-navigate, hover-to-preview, theme toggle. The set of stateful components is small.

Hover effects: bg/border changes only (CLAUDE.md Design Rules — no transform/scale/shadow transitions on hover).

### Link (navigation + inline)

| State | Color | Underline | Extra |
|---|---|---|---|
| default | `var(--color-foreground)` | none (navigation) / `underline text-underline-offset: 3px` (inline in article) | — |
| hover | `var(--color-accent)` | same as default | — |
| active | `var(--color-accent)` | same | — |
| visited | unchanged | same | — |
| focus | unchanged | same | `outline: 2px solid var(--color-focus-ring); outline-offset: 3px;` |

### StoryCard / ThoughtCard

| State | Background | Border | Shadow | Extra |
|---|---|---|---|---|
| default | `var(--color-surface)` | `1px solid var(--color-border)` | `var(--shadow-soft)` | `border-radius: 16px` |
| hover | `var(--color-surface)` | `1px solid var(--color-accent)` | `var(--shadow-soft)` | — |
| active (pressed) | `var(--color-surface-muted)` | `1px solid var(--color-accent)` | `var(--shadow-soft)` | — |
| focus | unchanged | `1px solid var(--color-accent)` | `var(--shadow-soft)` | `outline: 2px solid var(--color-focus-ring); outline-offset: 2px;` |

> Cards do not have a disabled state. Shadow does not change on hover (per CLAUDE.md rule — no shadow transitions).

### ThemeToggle (button)

| State | Background | Icon color | Extra |
|---|---|---|---|
| default | `transparent` | `var(--color-foreground-muted)` | — |
| hover | `var(--color-surface-muted)` | `var(--color-foreground)` | — |
| active | `var(--color-surface-muted)` | `var(--color-accent)` | — |
| focus | `transparent` | unchanged | `outline: 2px solid var(--color-focus-ring); outline-offset: 2px;` |

## 4. Motion Palette

Portfolio uses Framer Motion for section reveals and fade-ins. To keep motion intentional rather than decorative, there are exactly **three** durations and one easing curve. Every future motion should reach for one of these; adding a fourth requires justifying why the existing three don't fit.

### Motion tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `0.3s` | Color / theme transitions (body bg+text toggle in dark mode) |
| `--duration-base` | `0.4s` | FadeIn — short content (hero text, CTA) |
| `--duration-slow` | `0.6s` | ScrollReveal — section entrances below the fold |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | CSS easing (approximates Framer `easeOut`) |

Framer Motion JS mapping (exact values — keep in sync with CSS tokens):

| CSS token | Framer JS equivalent |
|---|---|
| `--duration-fast` | `{ duration: 0.3 }` |
| `--duration-base` | `{ duration: 0.4 }` (used in `FadeIn.tsx`) |
| `--duration-slow` | `{ duration: 0.6 }` (used in `ScrollReveal.tsx`) |
| `--ease-out` | `{ ease: 'easeOut' }` |

### Forbidden motion

- ❌ Parallax scroll effects
- ❌ Particle systems / animated backgrounds
- ❌ Infinite looping animations (outside the theme-toggle transition)
- ❌ Hover scale / rotate / shadow transitions
- ❌ Text gradients animated on hover
- ❌ "Magic cursor" / custom cursor effects

Any motion beyond FadeIn + ScrollReveal + theme transition should be justified in a plan revision before implementation.

## 5. Agent Prompt Guide

Ready-to-use prompt for an AI agent building a new feature inside this project:

```
You are building a feature for Portfolio — a story-driven personal site for
"만들고 쓰고 기록하는 사람" (a maker/writer/recorder). The site serves
thoughts, stories, and case studies. It is READ-FIRST: tap to navigate,
hover to preview. No dashboards, no forms beyond search, no dense data grids.
The design system is defined in DESIGN.md at project root.

1. Use semantic tokens (--color-background, --color-foreground,
   --color-foreground-muted, --color-foreground-subtle, --color-surface,
   --color-surface-muted, --color-border, --color-accent, --color-focus-ring,
   --color-code-bg, --color-code-text) or component tokens (--shadow-soft,
   --article-*) defined in DESIGN.md Section 1.
   - DO NOT reference primitive tokens (--color-cream-50, --color-stone-*,
     --color-amber-*) directly in component code
   - DO NOT use raw hex values in component code
   - For Tailwind utilities: prefer `bg-[var(--color-background)]` arbitrary
     values (matches the existing pattern in layout.tsx) OR wire tokens
     through @theme for proper `bg-background` utilities
   - State colors (--color-success/danger/warning/info) exist but are
     currently unused — reach for them when adding form validation or
     render-error fallbacks

2. Follow the TRIPLE-REGISTER typography rules (Section 2):
   - Headings h1..h6: Inter via --font-inter (already wired)
   - Body / UI / article body: Noto Sans KR via --font-noto-sans-kr
   - Blockquotes in .article-content ONLY: Georgia + Noto Serif KR via --serif
   - Do not introduce a fourth font. Do not use a serif outside .article-content blockquote.
   - Base sizes: body 18px/1.8, article body 17px/1.85, captions 14px

3. Every interactive component must implement the 5 states in Section 3:
   default / hover / active / disabled / focus.
   - Hover effects: color or border changes only (no transform / scale / shadow transition)
   - Focus must be visible (outline + offset, amber ring)
   - Portfolio cards use `border-radius: 16px` + `var(--shadow-soft)` as the baseline shape

4. Motion discipline (Section 4):
   - Use FadeIn or ScrollReveal for new entrances — do NOT hand-roll new animations
   - Three duration tokens only: --duration-fast/base/slow
   - No decorative motion (see "Forbidden motion" list)

5. Voice & tone: follow Section 6 — Korean-first, observer-documenter voice,
   "ㅂ니다체" formal / "해요체" warm-formal mix. Never sell. Never promote.
   Never use marketing language ("혁신", "최첨단", "완벽한"). The site says
   "I record" — the voice reflects that.

6. Dark mode uses class-based `html.dark` (NOT media query). The pre-hydration
   script in layout.tsx handles the initial `.dark` class assignment. Do NOT
   add a second dark-mode mechanism. Do NOT use `@media (prefers-color-scheme: dark)`.

7. CLAUDE.md forbids: gradient-text, glass, glow, particle effects, tech
   badges. Also no "tech portfolio" aesthetics (no skill clouds, no timeline
   of tools, no project-count counters).

8. When in doubt, subtract before adding (CLAUDE.md Design Rules). Portfolio's
   identity is absence — no visual chatter, one sentence, one palette, one
   motion scale.

9. Follow `ui-ux-pro-max` skill for contrast (WCAG AA minimum), spacing
   scale, accessibility. DESIGN.md does not override those rules.

10. Icons: lucide-react is already installed. Never inline SVG for standard icons.

11. For TipTap article rendering: the server-side renderer is in lib/tiptap.ts.
    Respect that article HTML is generated at build/request time (SSR/ISR),
    not client-side — do not import TipTap runtime in client components.
```

## 6. Voice & Tone

Portfolio speaks **Korean as primary**. The voice is the **observer / documenter** — someone who makes, writes, and records what they notice. It is warm but restrained, formal but never stiff, never marketing, never sales. "기록" (record) is the operative verb, not "만들었다" (I built) or "해냈다" (I accomplished).

### Channel reference

| Channel | Tone | Example (Korean — primary) |
|---|---|---|
| Hero / intro | Observer, first-person, one-sentence | "만들고, 쓰고, 기록합니다" — not "저는 풀스택 개발자입니다" |
| Story title | Factual, specific, no hype | "Navigator — 2024년 여름에 만든 웹 북마크 관리자" — not "혁신적인 차세대 북마크 솔루션" |
| Thought excerpt | Quoted sentence from the piece, no framing | Pull the first line of the body as-is |
| Link label (navigation) | Direct verb or noun, no "Click here" | "이야기 보기", "기록 전체", "소개" |
| Empty state | Quiet, factual, no apology | "아직 기록이 없습니다." (no CTA — this is a personal site, the owner adds content when they add it) |
| Error (render fallback) | Neutral, one sentence | "콘텐츠를 불러올 수 없습니다." (currently hardcoded in tiptap.ts:12 — see follow-up) |
| Footer | Minimal, contact + copyright only | No "Made with ❤️", no tech stack brag |

### Microcopy rules

- **Korean primary**. English only for brand/tech terms that have no Korean equivalent (Next.js, Supabase, TipTap).
- **Tense**: present tense. "만듭니다" / "기록합니다" — not past "만들었습니다".
- **Register**: "ㅂ니다체" (formal polite) for headings and navigation, "해요체" (warm polite) for body prose and optional reflective sentences. Do NOT mix within a single block.
- **No marketing superlatives**: "혁신", "최첨단", "완벽", "최고의", "차세대" are banned.
- **No exclamation marks** anywhere — not in success states, not in headings, not in hero text.
- **No emojis in navigation, body, or titles**. Emojis are allowed only in (a) TipTap-authored article body as the author's deliberate choice, or (b) rare case-study decorative accents if directly relevant. Default to none.
- **Button labels are nouns or noun+verb**: "이야기", "생각", "소개 읽기" — not "읽어보세요".
- **Dark mode toggle label**: no label (icon only) — respects the restraint principle.

### What NOT to do

- ❌ "안녕하세요! 저는 열정적인 풀스택 개발자 람쥐썬더입니다! 🚀" — hero text; too loud, sells, uses emoji
- ❌ "혁신적인 차세대 북마크 솔루션" — marketing language
- ❌ "지금 바로 시작해보세요!" — CTA sales voice
- ❌ "Made with ❤️ and Next.js" — stack brag in footer
- ❌ "저의 포트폴리오에 오신 것을 환영합니다" — generic greeting
- ✅ "만들고, 쓰고, 기록합니다" — one sentence, identity, no sell
- ✅ "2024년 여름에 만든 웹 북마크 관리자" — factual, specific, dated

---

## Appendix — Hardcoded color audit (Wave 1 refactor)

### Inside globals.css (done in Wave 1 — reorganization, not deletion)

Portfolio's original `globals.css` had 13 color values, all already centralized at `:root` + `html.dark` override blocks. No stray hex elsewhere in the CSS. The Wave 1 refactor **splits** the existing flat tokens into primitive/semantic/component/legacy layers and adds state tokens + motion tokens. No existing hex value is removed.

| Before | After | Change type |
|---|---|---|
| `--bg-primary #faf8f5` (flat, `:root`) | `--color-cream-50` (primitive) + `--color-background` (semantic) + `--bg-primary` (legacy alias) | Split |
| `--bg-secondary #ffffff` | `--color-white` (primitive) + `--color-surface` (semantic) + legacy alias | Split |
| `--bg-muted #f3f0eb` | `--color-cream-100` (primitive) + `--color-surface-muted` (semantic) + legacy alias | Split |
| `--text-primary #1c1917` | `--color-stone-900` + `--color-foreground` + legacy alias | Split |
| `--text-secondary #44403c` | `--color-stone-700` + `--color-foreground-muted` + legacy alias | Split |
| `--text-subtle #78716c` | `--color-stone-500` + `--color-foreground-subtle` + legacy alias | Split |
| `--accent #92400e` (light) / `#fbbf24` (dark) | `--color-amber-800` + `--color-amber-400` + `--color-accent` (semantic, owns mode variants) + legacy alias | Split + dark variant promoted to semantic layer |
| `--border #e7e5e4` (light) / `#44403c` (dark) | `--color-stone-200` + `--color-stone-700` + `--color-border` (semantic) + legacy alias | Split |
| `--shadow-soft` | Unchanged — already at component layer. Moved into component section with comment. | Layer annotation |
| `--serif` | Unchanged — kept as literal font stack, not re-aliased (font-family ≠ color) | No change |
| `--code-bg #1e293b` / `#0c0a09` | `--color-slate-800` + `--color-stone-950` + `--color-code-bg` (semantic) + legacy alias | Split |
| `--code-text #e2e8f0` | `--color-slate-200` + `--color-code-text` (semantic) + legacy alias | Split |
| (absent) | `--color-success/danger/warning/info` | New semantic additions |
| (absent) | `--duration-fast/base/slow` + `--ease-out` | New motion layer (CSS declarations only) |

### Outside globals.css (DEFERRED — follow-up work after Wave 1)

1. **`src/lib/tiptap.ts:12`** — inline `<p style="color:#ef4444">` fallback message on render error. Follow-up: replace with a CSS class like `.tiptap-render-error { color: var(--color-danger); }` defined in globals.css, then reference `<p class="tiptap-render-error">` in tiptap.ts. Deferred because it requires touching non-CSS code and testing the render-error path (which requires an intentionally-broken TipTap document), which is scope creep for a pure CSS refactor.

2. **Framer Motion JS constants in `ScrollReveal.tsx` / `FadeIn.tsx`** — currently `duration: 0.4` / `duration: 0.6` / `ease: 'easeOut'` are written as JS object literals. Follow-up: extract to `src/lib/motion.ts` with named exports (`DURATION_FAST`, `DURATION_BASE`, `DURATION_SLOW`, `EASE_OUT`) and import in the two effect components. Optionally wire the JS constants from the same source-of-truth as the CSS `--duration-*` tokens via a build-time script or a TS const mirror. Deferred because this is a JS refactor, not a CSS refactor, and the CSS tokens already document the JS values in a table above.

3. **Audit of `Header.tsx` / `AboutContent.tsx` / `IntroSection.tsx`** for Framer Motion usage not routing through ScrollReveal/FadeIn. Follow-up: verify no ad-hoc `duration: 0.5` / `duration: 1.2` / etc. values have crept in outside the three motion tokens. Deferred — requires code-level inspection and potentially refactoring Framer props to use the constants from #2.

4. ~~**Article-content custom sizes as component tokens**~~ — **DONE in Wave 1**. `.article-content h1/h2/h3` now consume `var(--article-h1-size)` / `var(--article-h2-size)` / `var(--article-h3-size)` via globals.css, and `.article-content blockquote` consumes `var(--blockquote-border)` + `var(--blockquote-font)`. `.article-content` body also consumes `var(--article-body-font)` / `-size` / `-leading`. No follow-up needed. The remaining inline references in `.article-content` (`h1/h2/h3` color, `p/li` spacing, `code` bg via legacy `--bg-muted`, `pre` bg via legacy `--code-bg`, `a` color via legacy `--accent`, `hr` border via legacy `--border`, `s` color via legacy `--text-subtle`) all go through legacy aliases that chain to the semantic layer — no orphan references, no pending migration in this area.

5. **State token consumers** — Portfolio currently has no UI for success/danger/warning/info. When a future feature (form validation, toast, etc.) arrives, it should consume `--color-success` etc. directly, not introduce new state tokens.

## Appendix — Related assets

- Cross-project UX rules: `~/.claude/skills/ui-ux-pro-max/SKILL.md`
- From-scratch creation: `~/.claude/skills/frontend-design/SKILL.md`
- Global design rules: `C:\vibe\CLAUDE.md` § Design Rules
- Inspiration library: `C:\vibe\docs\design-references\README.md`
- Rollout plan: `C:\vibe\docs\plans\PLAN-DESIGN-MD-ROLLOUT.md`
- Design feedback workflow: `C:\vibe\docs\guides\design-feedback-workflow.md`
- Portfolio CLAUDE.md: project root `CLAUDE.md` — stack, Supabase, CMS tag convention, routes, design system summary
