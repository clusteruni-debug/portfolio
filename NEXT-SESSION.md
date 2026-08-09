# Portfolio — Next Session Handoff (2026-08-09: live rendering restored)
last_verified: 2026-08-09

Derivable state (status, latest commit, verified procedures) lives in
`memory/reference/reference_project_portfolio_context.md`. This file carries only what no
pipeline reconstructs: open human decisions, durable gotchas, and the paste-ready prompt.

## 2026-08-09: every article body on the live site had been failing to render

Head `270de78`, pushed, Vercel production Ready and live-verified. The user reported it as
"포트폴리오에 발행해도 콘텐츠를 제대로 못 가져온다".

Two independent bugs, both silent, both reproduced before fixing:

- **`renderArticleHTML` threw on every server render.** `src/lib/tiptap.ts` used
  `generateHTML` from `@tiptap/react` v3, which serializes through the DOM and needs a
  browser. Under ISR/RSC it threw `ReferenceError: window is not defined` every single
  time; the function's own `try/catch` swallowed it and shipped the fallback string, so
  every detail page silently showed "콘텐츠를 렌더링하지 못했습니다." with no error anywhere.
  Reproduced with node against this project's own `node_modules` before changing anything.
  Replaced with a dependency-free recursive JSON→HTML renderer (escaping, link-protocol
  allowlist, unknown nodes degrade to their children, `articleLink` renders as plain text
  so it never links back into the editor app).
- **Story queries always returned `[]`.** `getAllStories()` and `getFeaturedStories()`
  filtered with `.like('tags::text', '%portfolio:story:%')`. PostgREST rejects that cast —
  `42883 operator does not exist: text[] ~~ unknown` — so `/stories` was permanently empty
  and no story could ever be featured. Verified by curl against the live REST endpoint.
  The `.contains('tags', [...])` form is valid and was kept; prefix matching now happens in
  JS after the fetch.

Verification: `npx tsc --noEmit` and `npm run build` exit 0; a runtime smoke rendered a real
article body pulled from the live database (1460 chars, no fallback), and confirmed
`javascript:` hrefs are dropped and markup in text is escaped; after deploy, both live
articles render their bodies at `https://portfolio-chi-kohl-50.vercel.app/thoughts/<id>`.

## Decisions taken, so they are not relitigated

- **No new TipTap dependency.** `@tiptap/html` / `@tiptap/static-renderer` would also have
  fixed the render bug. Rejected: the document model here is a small fixed node set, the
  hand-rolled renderer is ~90 lines with no version coupling to the editor app, and the
  editor's own custom nodes (`articleLink`, slash commands) would need registering anyway.
  If the editor's schema grows substantially, revisit — that is the trigger.
- **Featured is story-only by design.** `getFeaturedStories()` requires BOTH
  `portfolio:featured` and a `portfolio:story:*` tag, so tagging a *thought* as featured
  puts it nowhere on the home hero (it still appears under latest thoughts). This was left
  as-is on 2026-08-09 and mentioned to the user; if they want featured thoughts, the home
  section logic is the only thing that changes.

## Durable gotchas

- **This project renders entirely server-side and swallows errors by design.** `articles.ts`
  returns `[]` on any Supabase error and `tiptap.ts` returns a fallback string — so a broken
  query or renderer looks exactly like "no content", never like a failure. When something is
  missing from the live site, reproduce the query/render directly (curl the REST endpoint,
  run the renderer under node) rather than reading the page and guessing.
- **Cast filters (`col::text`) are not available through PostgREST** for array columns.
  Use `contains` / `overlaps`, or filter in JS after fetching.
- **On-demand revalidation is not wired in production.** `POST /api/revalidate` exists and
  article-editor proxies to it, but the Vercel project has only the two Supabase env vars —
  `REVALIDATION_SECRET` (here) and `PORTFOLIO_URL` / `PORTFOLIO_REVALIDATION_SECRET` (in
  article-editor) are unset, so the proxy 500s and publishing relies on the 60s ISR window.
  That is acceptable and the user was told so; setting the secrets is a user action because
  CC cannot write env files.
- **Production alias is `https://portfolio-chi-kohl-50.vercel.app`** (`.vercel/project.json`
  has the ids; `vercel inspect <deployment>` lists the aliases). There is no custom domain.

## Paste-ready next-session prompt

```
portfolio 작업이야. 워크스페이스는 C:\vibe, 프로젝트는 projects/portfolio
(자체 git 저장소, origin/master head 270de78, Vercel 자동 배포,
라이브 주소 https://portfolio-chi-kohl-50.vercel.app).

이 사이트는 article-editor와 Supabase 인스턴스를 공유하고, portfolio:thought /
portfolio:story:{slug} / portfolio:featured 태그로 글을 가져와. 렌더링은 전부
서버 사이드야.

2026-08-09에 두 가지를 고쳤어: ① 글 상세 페이지가 전부 "콘텐츠를 렌더링하지
못했습니다"로 나오던 것 — @tiptap/react의 generateHTML이 브라우저 전용이라 서버에서
매번 죽었고 try/catch가 그걸 삼켰어. 의존성 없는 자체 렌더러(src/lib/tiptap.ts)로
교체했어. ② 스토리 목록이 항상 비어 있던 것 — .like('tags::text', ...) 가 PostgREST
에서 거부(42883)돼서 늘 빈 배열이었고, JS 필터로 바꿨어. 둘 다 라이브 검증했어.

주의할 것: 이 프로젝트는 에러를 조용히 삼키는 구조야. articles.ts는 Supabase 에러 시
빈 배열을, tiptap.ts는 fallback 문자열을 돌려줘서 고장이 "콘텐츠 없음"처럼 보여.
라이브에서 뭐가 안 보이면 페이지를 읽고 추측하지 말고 쿼리와 렌더러를 직접 재현해
(REST 엔드포인트에 curl, 렌더러는 node로 호출).

시작할 때 projects/portfolio/NEXT-SESSION.md 의 "Durable gotchas"를 읽어.
```
