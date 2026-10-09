# Portfolio — Next Session Handoff (2026-09-28: video gallery on Git and Vercel Blob, finished works only)
last_verified: 2026-10-09

**Remaining work: this repo has no `docs/plans/`**, so there is no PLAN file to point at. The
items below are open questions for the user and review proposals, not a backlog. Derivable state (status,
latest commit, verified procedures) lives in `memory/reference/reference_project_portfolio_context.md`
(workspace repo).

- Article renderer and data-layer gotchas — the renderer is an XSS boundary and failures are
  swallowed by design: `memory/reference/reference_portfolio_durable_gotchas.md` (workspace
  repo). Read it before touching `src/lib/tiptap.ts` or `src/lib/articles.ts`.
- Earlier handoff blocks (2026-08-09): `docs/handoff/archive/NEXT-SESSION-2026-08.md`.

## 2026-10-09: Next.js 16.3.8 security upgrade

`next` and `eslint-config-next` moved from ^16.1.6 to ^16.3.8. The lockfile holds next 16.3.8, and
`npm audit fix` then installed eslint-config-next 16.4.0 (dev only). This closes the two critical Next.js
advisories behind the Dependabot count below (workspace audit
`docs/audits/2026-10-09-security-and-repo-sweep.md` §0).
- Verified: `npm run build` 0 and `npx tsc --noEmit` 0 (CI runs both), `npm audit --omit=dev` 0.
- Smoke test under `next start -H 127.0.0.1`: `GET /` returned 200 with the site title.
- Left: five dev-only highs in the eslint-config-next chain. Their only offered fix is a downgrade.
- Pushed as `d97bfeb`. The Vercel production deploy is Ready and the live site serves the Next.js
  16.3.8 client bundle. CI failed at `npm ci` (run 37929434310): the lockfile had been regenerated
  with npm 11, which dropped the optional `@floating-ui/dom` entry. The follow-up commit restores it;
  its CI run was still pending when this was written.
- **Gotcha: check the lockfile with npm 10.** CI uses Node 22, so npm 10. npm 11 (local Node 24)
  drops the optional `node_modules/@floating-ui/dom` entry that `@tiptap/extension-bubble-menu`
  depends on, and adds `"peer": true` flags; npm 10 `npm ci` then fails with
  `Missing: @floating-ui/dom@1.8.0 from lock file`. After any lockfile change run
  `npx -y npm@10 ci --dry-run --ignore-scripts`; if it fails, regenerate with
  `npx -y npm@10 install --package-lock-only --ignore-scripts`. article-editor has the same gap; its
  CI smoke job uses `npm install` instead.

## 2026-09-28: video gallery

Head `6dccc2c` on origin/master. Production is the Git build `dpl_FqZ65mqnYkf3GQV3H4jgMdGvP4kG`
on `https://portfolio-chi-kohl-50.vercel.app`; `/videos` shows 23 works.

The binding rules are in `AGENTS.md`: a work needs evidence that it is a finished piece, video
hosting is Vercel Blob with R2 and Workers not adopted, and production builds only from Git
pushes. Numbers, the cleanup record and the release checklist: `docs/deploy.md`. Per-work
evidence: `docs/videos.md`. Hosting evidence and the transfer-limit risk:
`docs/reference/vercel-video-delivery.md`.

Verification: `node scripts/verify-videos.cjs --production` passed on the production builds,
`node scripts/publish-videos.cjs --check` verified 23 of 23, and three long works played to the
end from the user's connection (`tmp/video-blob-continuous-probe-20260928.json`, gitignored).
Closeout re-check at 23:53 +0900: `vercel inspect` shows the deployment Ready on the production
alias, and the live `/videos` HTML carries all 23 catalog ids and none of the three withdrawn ones.

### Waiting on the user

- Delete the untracked leftovers of the dropped hosting work? `scripts/migrate-videos-to-r2.cjs`,
  `scripts/migrate-videos-to-workers.cjs`, `tests/r2-videos.test.cjs`,
  `tests/workers-videos.test.cjs`, `cloudflare/`, and the withdrawn works' posters
  `public/videos/posters/{envelope,hana-rin-giant,ramz-dance}.webp`. Nothing references them;
  they stay until the user OKs that deletion on its own. (`memory/codex-session/` is a Codex
  prewrite record from 2026-09-27, not part of this work.)
- ~~Dependabot reports 61 vulnerabilities on the default branch (2 critical). Not triaged.~~ Handled on
  2026-10-09 (block above).
- Optional: post URLs for beolcho, delivery, seoul-fpv and boy-awakening. The user said on
  2026-09-28 that all four were posted; no URL or date is recorded.

### Proposed, not started

From the 2026-09-28 review (`memory/reviews/cc-review-PORTFOLIO-VIDEO-R2-20260928-11.md`,
workspace repo), in priority order:

1. A quality gate for the re-encoded copies (luma SSIM or VMAF), plus the user watching
   Sweeper and Eunseol dance once.
2. The continuous-playback probe inside the verifier; another Korean ISP and mobile.
3. Player: mobile menu aria attributes, a retry control, captions.
4. Catalog hygiene: provenance gaps, a definition for `selectionConfirmedAt`, removing the
   `PORTFOLIO_VIDEO_BASE_URL` fallback.

Hosting is re-opened only by a trigger. Hobby Blob allows 10 GB of transfer a month (about
1,300 full plays at the 7.8 MB mean), and over a limit Blob is inaccessible for 30 days. Then
pilot an R2 custom domain or Vercel Pro behind a measured playback probe first.

### Gotchas from this session

- Release = commit, then push `master`. A `vercel deploy --prod` of uncommitted files lasts only
  until the next push, whoever makes it (the 2026-09-28 10:12–13:27 `/videos` 404). Emergency
  restore: `vercel promote <deployment-id> --yes`, then commit at once — the next Git build
  takes the alias again.
- `vercel blob` needs the store's read-write token; a linked, logged-in CLI does not supply it.
  Load it in memory from the project env through the Vercel REST API (workspace
  `memory/knowledge/ERROR-BOOK.md`, 2026-09-28); do not `vercel env pull`.
- Claude Code auto mode refuses a credential-loading remote delete. Run the dry run yourself
  and hand the user the delete line to run with `!`.
- The public repo carries each work's archive `sourceFile` path and hashes. Checked on
  2026-09-28: no secrets or personal paths.

## Paste-ready next-session prompt

```
portfolio 작업이야. 워크스페이스는 C:\vibe, 프로젝트는 projects/portfolio
(자체 git 저장소, 10-09 Next.js 16.3.8 보안 업그레이드 커밋까지 master에 반영, master에 push하면 Vercel이 자동으로
프로덕션 빌드, 라이브 주소 https://portfolio-chi-kohl-50.vercel.app, 영상 갤러리는 /videos).

영상 갤러리 현황(2026-09-28):
- 23편 공개. 영상은 Vercel Blob 스토어 portfolio-videos에서 나가. Cloudflare R2와
  Workers는 검토 끝에 안 쓰기로 했어 — 내가 새로 요청하기 전엔 다시 꺼내지 마.
- 최종본만 올려. 완성본이라는 증거(내 확인, 내 SNS 게시, 제작 기록에 완성본으로 적힌 것)가
  있어야 하고, 파일 이름의 final이나 수정 시각으로 추측하지 마. 규칙은
  projects/portfolio/AGENTS.md에 있어.
- 배포는 커밋 후 master push만. 커밋 안 한 파일을 vercel deploy --prod로 올리면 다음
  push에 덮여 — 9/28에 그래서 /videos가 3시간 넘게 404였어. 급하면
  vercel promote <배포ID> --yes로 살리고 바로 커밋해.
- 배포 체크리스트와 수치는 docs/deploy.md, 작품별 근거는 docs/videos.md.

내 결정 기다리는 것:
1. 안 쓰기로 한 호스팅 작업의 추적 안 되는 파일들(scripts/migrate-videos-to-r2.cjs,
   scripts/migrate-videos-to-workers.cjs, tests/r2-videos.test.cjs,
   tests/workers-videos.test.cjs, cloudflare/)과 내린 3편 포스터
   (public/videos/posters/envelope.webp, hana-rin-giant.webp, ramz-dance.webp)를 지울지.
   지우기 전에 목록 보여주고 따로 OK 받아.

Dependabot 취약점은 10-09에 Next.js 16.3.8로 정리했어. 실행에 쓰이는 부품은 0이고, 남은 5개는
린트 도구 쪽이라 고치려면 다운그레이드여서 그대로 뒀어. [source: SESSION-20261009-13; added: 2026-10-09]
package-lock.json을 바꿨으면 푸시 전에 npx -y npm@10 ci --dry-run --ignore-scripts로 확인해. 로컬 npm 11이
@floating-ui/dom 항목을 빼면 CI(npm 10)가 설치를 거부해서, 10-09에 CI가 한 번 깨졌어.
[source: SESSION-20261009-13; added: 2026-10-09]

제안만 되고 아직 안 한 개선: 재인코딩 화질 게이트(SSIM/VMAF), 연속 재생 검사를
검증기에 넣기(다른 통신사·모바일), 플레이어 접근성(모바일 메뉴 aria, 재시도, 자막).
자세한 건 projects/portfolio/NEXT-SESSION.md.

글 렌더러(src/lib/tiptap.ts)를 건드리면 C:\vibe\memory\reference\reference_portfolio_durable_gotchas.md
부터 읽어. 렌더 결과가 공개 페이지에 dangerouslySetInnerHTML로 들어가는 보안 경계라서
링크·이미지 주소는 "정규화 → 검사 → 정규화된 값 출력" 순서를 지켜야 하고, 이 사이트는
에러를 조용히 삼켜서 고장이 "콘텐츠 없음"처럼 보여.
```
