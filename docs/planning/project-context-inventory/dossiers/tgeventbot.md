# Project Dossier: TGEventBot

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: tgeventbot
display_name: TGEventBot
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- TGEventBot은 Telegram에서 흘러오는 이벤트성 정보를 분류, 보류, 승인, export하는 수집 봇이다.
- 사용자의 필요는 모든 이벤트를 자동으로 처리하는 것이 아니라, 많은 메시지 중 나중에 행동할 만한 것을 놓치지 않는 것이었다.

### 당시의 개인적 맥락

- 이벤트/에어드랍/글감/아이디어는 Telegram에서 빠르게 지나간다.
- 자동 분류는 필요하지만, 최종 상태 변경과 사용 여부는 사람이 통제해야 한다.
- Navigator와 Article Editor로 이어지는 deep link/export가 중요한 이유도 여기에 있다.

### 처음에 무엇을 착각했나

- 메시지를 저장하면 끝날 것처럼 보이지만, 실제로는 status, staged approval, duplicate/rejected hash, deadline, Navigator deep link가 필요했다.
- Supabase schema를 바꾸면 생산자/소비자 read/write swap이 함께 움직여야 한다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 bot/web/database/scraper를 분리해 관리하게 했다.
- Codex는 notes rename, bot-local scope, py_compile/test boundary 같은 좁은 변경 검토에 쓰였다.

### 중요한 선택

- `status`를 sole source of truth로 삼았다.
  - 남긴 것: pending/done/skipped status.
  - 버린 것: `participated` 같은 중복 상태.
  - 이유: Navigator와 bot/web이 같은 상태를 읽어야 한다.

- staged approval을 남겼다.
  - 남긴 것: approve/reject workflow.
  - 버린 것: scraper 결과를 바로 확정하는 방식.
  - 이유: 자동 분류는 후보를 만들 뿐, 공개/행동 판단은 사람이 해야 한다.

### 현재 상태

- Active.
- WSL systemd bot + Vercel web + Supabase 구조다.
- 포트폴리오에서는 자동 수집과 수동 승인 경계를 보여주는 작은 운영 도구로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 공개 문장에서는 이벤트 소스나 내부 채널 detail을 빼야 한다.

### 남겨둔 이유

- TGEventBot은 AI/자동화가 "분류"까지 하고, 사용자가 "승인/보류"를 남기는 경계를 보여준다.

### 내가 얻은 방식

- 자동 분류는 상태 모델이 없으면 쓸 수 없다.
- bot과 web과 Navigator가 같은 데이터 의미를 공유해야 한다.
- 스키마 변경은 소비자 배포 순서까지 함께 설계해야 한다.

### 포트폴리오 각도

TGEventBot은 Telegram 이벤트를 자동으로 모으되, 최종 판단은 사용자에게 남겨둔 수집/승인 도구다.

### 공개 가능 메모

- Telegram event classification and staged approval.
- Navigator deep link and export flow.
- status-based workflow.

### 비공개/수정 필요 메모

- 채널, 메시지 원문, API key, Supabase details는 공개하지 않는다.

## English Machine Summary

TGEventBot is a secondary portfolio candidate about classifying Telegram events
while keeping staged approval and status changes under user control.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:18-19` | registry | high | Active WSL bot plus Vercel web, Supabase-backed. |
| `projects/tgeventbot/CLAUDE.md:1-7` | project_doc | high | Defines stack and deployment. |
| `projects/tgeventbot/CLAUDE.md:27-54` | project_doc | high | Records classification, staged event, export, and scraper structure. |
| `projects/tgeventbot/CLAUDE.md:84-87` | project_doc | high | Records post-2026-04-25 status schema and Navigator deep link. |
| `MEMORY.md:1644-1661` | raw_codex_log_summary | medium | Prior memory covers insights-to-notes rename and bot-local scope constraints. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/tgeventbot/CLAUDE.md
  - config/integrations.json
  - memory/diary
stale_when:
  - Telegram message status schema changes.
  - Navigator or Article Editor integration changes.
```
