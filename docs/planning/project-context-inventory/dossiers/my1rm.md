# Project Dossier: My1RM

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: my1rm
display_name: My1RM
registry_status: active
inventory_status: draft
public_policy: public_candidate
```

## 한국어 본문

### 왜 시작했나

- 출발점은 "Cloudflare에 올릴", "AdSense 통과가 가능한 수준", "유지보수도 편리한 웹서비스"를 하나 실제로 만들어보자는 쪽이었다.
- 처음부터 대형 서비스가 목표였던 건 아니다. 후보를 크게 벌리다가 사용자가 직접 "그냥 1RM 계산기"로 좁혔다.
- 그래서 My1RM은 계산기 자체보다, 작은 공개 도구를 배포/검색/개인정보/광고 승인 문턱까지 밀어보는 시범 사이트에 가깝다.
- 이름도 별도 프로젝트로 가는 쪽을 사용자가 정했다. "my1rm 정도"로 새 폴더를 만들자는 판단이 이 프로젝트의 시작점이었다.

### 당시의 개인적 맥락

- 사용자는 "콘텐츠 뭐 추가할 게 딱히 없는데"라고 바로 걱정했다. 기능 하나만 있는 사이트가 공개 페이지와 AdSense 기준을 통과할 수 있는지가 문제였다.
- 계산 기능보다 먼저 올라온 기준은 공개 운영 기준이었다. 개인정보처리방침, 쿠키, IP, 위치 추정 허용, Cloudflare 등록 절차, GitHub 연결 가능 여부를 같이 봤다.
- AI에게 맡긴 건 "코딩"만이 아니었다. 사용자는 배포 절차를 "아주 친절하게 a to z"로 풀어달라고 했고, GitHub 등록을 AI가 어디까지 할 수 있는지도 확인했다.
- 공개 페이지의 문장도 사용자 기준에 걸렸다. "AI 티"는 좋은 문장/나쁜 문장 문제가 아니라, 친근한 척하는 말투와 개발자용 표현이 제품 표면에 남는 문제였다.

### 처음에 무엇을 착각했나

- IP 기준 동네/국가/나이대 순위는 처음엔 재미있어 보였다. 하지만 실제 표본과 랭킹 데이터가 없으면 순위가 아니라 오해가 된다.
- 정적 계산기면 간단할 줄 알 수 있었지만, 공개되는 순간 개인정보, 위치 동의, 방법론, SEO, 보안 헤더, Cloudflare Pages 설정까지 제품 일부가 됐다.
- "트래픽이 발생했는지"도 나중에 바로 확인될 줄 알았지만, 로컬 파일이나 rank 기록만으로는 총 방문을 증명할 수 없었다. Cloudflare Web Analytics 권한이 없으면 확인 가능한 범위가 갈렸다.
- 현재 프로젝트 문서도 약간의 상태 드리프트가 있다. `README.md`는 D1이 Pages Functions 서버 측에서 돈다고 쓰고, `CLAUDE.md`/`CHANGELOG.md`는 no DB 또는 no project-owned shared database 쪽으로 설명한다. 공개용 문장 전에는 이 표현을 정리해야 한다.

### AI와 어떻게 풀었나

- 사용자는 "더 예쁘게"나 "기능 더 넣어"가 아니라, 공개 가능한 작은 서비스의 조건을 먼저 던졌다. Cloudflare, AdSense, 유지보수, 개인정보가 첫 기준이었다.
- 위치 기반 기능은 그냥 자동으로 붙이지 않았다. 자동 `/api/location` 호출은 opt-in으로 바뀌었고, 지역은 coarse country/city label까지만 남았다.
- 실제 랭킹처럼 보이는 표현은 경계했다. My1RM은 "진짜 동네 순위"가 아니라 demo/dataset-derived percentile과 anonymous rank로 설명되어야 했다.
- 계산기 탭을 다시 잡을 때도 사용자는 "종목 선택식 + 1RM 집중"이라고 목표를 좁히고, "절대 보존" 목록을 뒀다. rank tab, `functions/api/rank.js`, ko/en 구조, 명사형 톤, 디자인 토큰, write whitelist/blacklist를 같이 묶어서 지시했다.
- 리뷰 요청도 느슨하지 않았다. Codex에는 "Read-only code review. DO NOT WRITE"와 findings-list 형식을 줬고, Claude Code sidechain에는 rank tab, state mutation, export/DOM references, kg/lb, ko/en re-render 같은 side-effect 관점을 따로 던졌다.
- 사용자는 모델 답을 곧바로 믿는 쪽보다, 모델 간 같은 편향을 의심하는 쪽에 가까웠다. "CC's 5-agent dispatch shares model bias and tends to MISS"라고 못 박고, 예측한 문제를 하나씩 검증하게 했다.

### 중요한 선택

- My1RM을 별도 미니사이트로 만들었다.
  - 남긴 것: Cloudflare Pages에 올릴 수 있는 작고 독립적인 공개 도구.
  - 버린 것: 기존 큰 프로젝트 안에 붙이는 흐름.
  - 이유: 시범 사이트는 작아야 배포, 검색, 광고, 개인정보 기준을 빠르게 검증할 수 있었다.

- 계산기는 install-free 정적 프론트로 유지했다.
  - 남긴 것: HTML/CSS/vanilla JS, Cloudflare Pages Functions.
  - 버린 것: 프론트엔드 빌드/번들러/불필요한 의존성.
  - 이유: 계산 도구의 핵심 가치는 빠른 접근성과 낮은 유지보수 비용이었다.

- 위치와 랭킹은 신뢰 쪽으로 제한했다.
  - 남긴 것: 동의 후 coarse location, demo/dataset-derived percentile, anonymous rank.
  - 버린 것: raw IP 저장, 실제 동네 순위처럼 보이는 문장, 계정/로그인.
  - 이유: 재미보다 공개 신뢰와 privacy behavior가 우선이었다.

- UX 재설계는 범위를 세게 잠갔다.
  - 남긴 것: rank tab, `functions/api/rank.js`, I18N ko/en, 명사형 톤, 기존 디자인 토큰.
  - 버린 것: gradient/box-shadow/scale hover/무한 애니메이션, 다른 프로젝트나 docs/memory 수정.
  - 이유: 계산기 탭만 바꾸는 작업이 public rank/API/문서 표면으로 새지 않게 하기 위해서다.

- 검증은 구현과 분리했다.
  - 남긴 것: read-only review, prediction-by-prediction verdict, side-effect review, local syntax/test/smoke checks.
  - 버린 것: "AI가 만들었으니 됐다"는 완료 판단.
  - 이유: 작은 공개 사이트라도 anchor, i18n, privacy, unit conversion, deployment path 같은 곳에서 쉽게 새는 부분이 생겼다.

### 현재 상태

- Active.
- 현재 문서 기준으로 My1RM은 Cloudflare Pages 기반 공개 미니사이트다. live URL은 프로젝트 `AGENTS.md`에 `https://my1rm.pages.dev/`로 기록되어 있다.
- 프론트는 static HTML/CSS/vanilla JS이고, Cloudflare Pages Functions가 coarse location과 서버 측 기능을 맡는다.
- 계정, 로그인, raw IP 저장은 금지되어 있다. rank 관련 기록이 있더라도 anonymous/coarse boundary 안에서만 다뤄야 한다.
- 트래픽 확인은 아직 dossier 기준으로 완전히 닫힌 이야기가 아니다. 2026-06-15 확인 시도에서는 Cloudflare 인증/권한 없이는 전체 방문 여부를 확정하지 못했다.
- 문서 간 DB/D1 표현은 공개 포트폴리오 문장으로 옮기기 전에 정리해야 한다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류된 부분이 있다면 "총 방문 트래픽 확인"과 "DB/D1 표현 정리"다. 둘 다 제품이 실패해서가 아니라, 공개 문장으로 쓰기엔 증거가 아직 정리되지 않았기 때문이다.

### 남겨둔 이유

- My1RM은 작은 도구라도 공개 가능한 수준으로 만들 때 무엇을 봐야 하는지 보여준다.
- 계산 기능보다 product surface가 중요했던 사례다. privacy, tone, deployment, SEO, review가 모두 제품 일부였다.
- 사용자가 AI를 코드 생성기로만 쓴 게 아니라, 공개 기준을 세우고 검증 범위를 좁히고 모델 답을 의심하는 도구로 쓴 흔적이 남아 있다.

### 내가 얻은 방식

- "작게 만들기"는 대충 만들기가 아니다. 작은 만큼 공개 표면을 더 선명하게 통제해야 했다.
- privacy는 페이지 문구가 아니라 동작으로 맞춰야 한다. 위치 기능은 동의 후 coarse label이어야 했고, raw IP 저장은 제외됐다.
- AI에게 구체적으로 맡길수록 사용자의 기준이 더 중요해진다. whitelist/blacklist, "절대 보존", read-only, output schema가 없으면 작업은 쉽게 새어 나간다.
- 여러 AI에게 검토를 맡겨도 같은 방향으로 놓칠 수 있다. 그래서 "모델이 봤다"가 아니라 어떤 failure mode를 보게 했는지가 더 중요했다.

### 포트폴리오 각도

My1RM은 "AI로 1RM 계산기를 만들었다"보다 "공개 가능한 작은 도구를 만들기 위해 AI에게 맡길 부분과 사람이 정할 기준을 계속 분리했다"는 사례로 쓰는 게 맞다.

### 공개 가능 메모

- Cloudflare Pages 기반 1RM 계산기.
- 계정 없이 접근 가능한 공개 도구.
- 위치 기능은 사용자가 동의한 뒤 coarse label만 사용.
- rank/percentile은 실제 동네 순위처럼 주장하지 않음.
- 계산기 UX, 개인정보, 배포, SEO, 말투, 검증을 같은 제품 표면으로 다룸.

### 비공개/수정 필요 메모

- raw Codex/Claude 로그와 diary 문장은 공개 문장으로 그대로 옮기지 않는다.
- 내부 경로, credential helper, 보안 스캔 세부 명령, Cloudflare 인증 실패 내용은 공개 문구에서 제외한다.
- DB/D1/no-DB 표현은 현재 프로젝트 문서 간 표현이 섞여 있으므로 공개 전 source-of-truth를 갱신해야 한다.
- 트래픽 발생 여부는 Cloudflare Analytics 권한으로 다시 확인하기 전까지 공개 성과처럼 쓰지 않는다.

## English Machine Summary

My1RM is an active Cloudflare Pages public mini-site for one-rep-max calculation.
The important portfolio signal is not that AI wrote a calculator. The user used
AI to turn a small public-tool idea into a deployable product surface while
setting strict human criteria: AdSense-readiness, maintainability, privacy
opt-in, no false local-rank claims, non-AI-like copy, bounded UX changes, and
read-only cross-model review.

## Evidence

| Evidence ID | Source | Role / Signal | Sections | Confidence | Summary |
| --- | --- | --- | --- | --- | --- |
| `my1rm-raw-codex-20260608-start` | `%USERPROFILE%/.codex/sessions/2026/06/08/rollout-2026-06-08T11-20-19-019ea507-e840-72b3-842c-4b21e4552966.jsonl` | user_turn / why, decision, publication_boundary | why_started, personal_context, ai_interaction | high | User framed the project as a Cloudflare, AdSense-ready, maintainable web service, narrowed it to "그냥 1RM 계산기", asked for privacy/cookie/IP/location handling, and requested Cloudflare steps "a to z". |
| `my1rm-diary-20260608-mvp` | `memory/diary/2026-06-08.md:584-609` | session_summary / status, decision | why_started, current_state | high | Records My1RM MVP creation, coarse location labeling, registry update, and verification. |
| `my1rm-diary-20260608-opt-in` | `memory/diary/2026-06-08.md:613-628` | session_summary / correction, privacy | ai_interaction, important_decisions | high | Records privacy choices banner and location opt-in change after automatic location behavior was rejected. |
| `my1rm-diary-20260608-deploy` | `memory/diary/2026-06-08.md:867-895` | session_summary / decision, verification | important_decisions, current_state | high | Records GitHub/public deployment preparation, security audit, Cloudflare Pages guidance, UX redesign, and review findings. |
| `my1rm-raw-codex-20260609-ux` | `%USERPROFILE%/.codex/sessions/2026/06/09/rollout-2026-06-09T15-27-08-019eab10-3caf-70b0-a039-d21690b658b2.jsonl` | user_turn / correction, rejection, scope | ai_interaction, important_decisions, what_i_learned | high | User specified "종목 선택식 + 1RM 집중", "절대 보존", I18N/tone/design constraints, write whitelist/blacklist, and external verification policy. |
| `my1rm-diary-20260609-tone` | `memory/diary/2026-06-09.md:395-419` | session_summary / lesson, status | personal_context, what_i_learned | high | Records SEO, Search Console, AI-tone removal, lift-picker UX redesign, code review, and remaining user action. |
| `my1rm-raw-codex-20260608-review` | `%USERPROFILE%/.codex/sessions/2026/06/08/rollout-2026-06-08T19-12-06-019ea6b7-d742-7881-9a28-9d12455a7b23.jsonl` | user_turn / review_boundary | ai_interaction, what_i_learned | high | User requested read-only review, no writes, no runtime/network commands, exact findings format, and prediction-by-prediction verification. |
| `my1rm-raw-claude-20260609-status` | `%USERPROFILE%/.claude/projects/-mnt-c-Users------Desktop------/0247c3aa-e508-40f5-be18-1846bfabfe29.jsonl:20` | user_turn / status_check | current_state, ai_interaction | medium | Claude Code session prompt records the user asking what state the 1RM project was in and to check the analyzer. |
| `my1rm-raw-claude-20260609-side-effects` | `%USERPROFILE%/.claude/projects/-mnt-c-Users------Desktop------/0247c3aa-e508-40f5-be18-1846bfabfe29/subagents/agent-a129783a7430ce111.jsonl:1` | review_prompt / verification_trace | ai_interaction, important_decisions | medium | Claude Code sidechain review contract focused on side effects: rank tab, state mutation, exports/DOM references, unit toggle, and language re-render. Treat as workflow evidence, not necessarily direct human prose. |
| `my1rm-raw-codex-20260615-traffic` | `%USERPROFILE%/.codex/sessions/2026/06/15/rollout-2026-06-15T12-01-49-019ec93a-6b3a-7032-95d9-e44a443976c0.jsonl` | user_turn / status_check | current_state, redaction_notes | high | User asked whether the My1RM site had traffic; Cloudflare Analytics access was needed for a conclusive answer. |
| `my1rm-project-docs-current` | `projects/my1rm/README.md`, `projects/my1rm/CLAUDE.md`, `projects/my1rm/AGENTS.md`, `projects/my1rm/CHANGELOG.md` | project_fact / status, guardrail | current_state, public_safe_notes, redaction_notes | high | Current docs confirm Cloudflare Pages, static front-end, no account/login/raw IP storage, and public guardrails; they also show DB/D1 wording that should be reconciled before publication. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/my1rm/README.md
  - projects/my1rm/CLAUDE.md
  - projects/my1rm/AGENTS.md
  - projects/my1rm/CHANGELOG.md
  - projects/my1rm/functions/api/rank.js
  - projects/my1rm/functions/api/location.js
  - memory/diary
  - "%USERPROFILE%/.codex/sessions/2026/06"
  - "%USERPROFILE%/.claude/projects"
stale_when:
  - The site adds accounts, login, raw IP storage, or new tracking.
  - Rank, percentile, or location claims change.
  - Cloudflare deployment path or live URL changes.
  - Public copy, methodology, or AdSense status changes materially.
  - DB/D1/no-DB wording is reconciled in project docs.
  - Cloudflare Analytics traffic is verified with current credentials.
```
