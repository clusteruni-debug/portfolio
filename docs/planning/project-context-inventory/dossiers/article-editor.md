# Project Dossier: Article Editor

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: article-editor
display_name: Article Editor
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- Article Editor는 글쓰기, 뉴스, 메모, 인용, 통계, 발행 상태를 한 흐름 안에 묶으려는 개인 편집실이다.
- 사용자의 문제는 "글을 쓰는 에디터" 하나가 아니라, source, note, quote, draft, publication이 서로 흩어지는 것이었다.
- 그래서 포트폴리오에서는 writing app보다 "개인 지식과 글쓰기 흐름을 다루는 작업실"로 설명하는 편이 맞다.

### 당시의 개인적 맥락

- 아이디어와 뉴스, 메모가 쌓여도 다시 글로 연결되지 않으면 가치가 줄어든다.
- 사용자는 AI drafts, spell check, notes, quotes를 모두 쓰되, DB 보안과 공개 경계를 계속 신경 썼다.
- 글쓰기 도구라서 UX뿐 아니라 데이터 보존, RLS, export가 중요했다.

### 처음에 무엇을 착각했나

- 에디터 기능만 있으면 글쓰기 도구가 된다고 보기 쉽다. 실제로는 notes/quotes/sources/publication/history가 연결되어야 했다.
- Supabase RLS는 migration을 썼다고 끝나지 않았다. live policy 이름과 실제 권한을 확인해야 했다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 feature 구현뿐 아니라 route, auth, pagination, migration, RLS, digest archive를 계속 검토하게 했다.
- Codex review는 diary-digests, news/digests routing, notes/quotes migration 같은 영역에서 boundary 확인용으로 쓰였다.

### 중요한 선택

- notes와 quotes를 분리했다.
  - 남긴 것: newsletter notes와 quote preservation entity.
  - 버린 것: 모든 생각을 하나의 insight로 뭉치는 방식.
  - 이유: 다시 글로 쓰려면 자료의 성격이 구분되어야 한다.

- anon write를 닫았다.
  - 남긴 것: service_role write proxy와 read-only anon policy.
  - 버린 것: 편의적인 permissive policy.
  - 이유: 개인 글쓰기 DB는 공개보다 보존과 통제가 우선이다.

### 현재 상태

- Active.
- registry 기준 Next.js/Supabase/Vercel, port 3010.
- TipTap editor, notes, quotes, sources, AI drafts, export, stats, version history를 갖춘 개인 글쓰기 작업실이다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- public page에서는 내부 DB/security detail보다 "글쓰기 workflow를 source/notes/quotes까지 확장한 이유"만 보여주는 것이 좋다.

### 남겨둔 이유

- Article Editor는 개인 지식과 발행 흐름을 하나로 묶은 보조 케이스다.
- AI를 생성 도구로만 쓰지 않고, 보안/라우팅/마이그레이션 검토에 쓴 흔적이 강하다.

### 내가 얻은 방식

- 글쓰기 도구는 입력창보다 자료의 생애주기가 중요하다.
- RLS/보안은 migration 작성보다 live verification이 중요하다.
- source, note, quote, draft를 나누면 나중에 다시 쓰기 쉬워진다.

### 포트폴리오 각도

Article Editor는 사용자의 글쓰기와 자료 수집을 하나의 작업실로 통합한 프로젝트다. 공개 포트폴리오에서는 "AI 초안 생성"보다 글쓰기 전후의 자료 흐름을 설계한 점을 보여준다.

### 공개 가능 메모

- TipTap 기반 개인 편집실.
- notes/quotes/source/publication을 함께 다룸.
- AI draft와 rule-based Korean spell check.

### 비공개/수정 필요 메모

- Supabase instance, service role, internal auth, raw article data는 공개하지 않는다.

## English Machine Summary

Article Editor is a secondary portfolio candidate: a personal writing studio
that connects editor, notes, quotes, sources, stats, drafts, and publication
state with strong database and auth boundaries.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:13` | registry | high | Active Vercel/Supabase project on port 3010. |
| `projects/article-editor/CLAUDE.md:3-14` | project_doc | high | Defines stack and deployment. |
| `projects/article-editor/CLAUDE.md:58-84` | project_doc | high | Records migrations, security model, notes/quotes, AI drafts, export, and editor features. |
| `MEMORY.md:425-545`, `MEMORY.md:1603-1613` | raw_codex_log_summary | medium | Prior memories cover diary digests, news/digests routing, pagination, and notes/quotes migrations. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/article-editor/CLAUDE.md
  - projects/article-editor/CHANGELOG.md
  - memory/diary
stale_when:
  - Notes/quotes schema changes.
  - Digest/news routes change.
  - Auth/RLS model changes.
```
