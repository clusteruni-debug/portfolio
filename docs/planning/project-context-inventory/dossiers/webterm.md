# Project Dossier: WebTerm

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: webterm
display_name: WebTerm
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- WebTerm은 수동 4분할 터미널을 대체하기 위해 만든 local web terminal dashboard다.
- 사용자의 필요는 새 터미널을 여럿 띄우는 것이 아니라, 코딩 세션을 브라우저급 UI에서 빠르게 보고 조작하는 것이었다.

### 당시의 개인적 맥락

- 여러 프로젝트를 동시에 다루면 터미널도 작업 표면이 된다.
- 터미널은 강력하지만 상태, 제목, pane, 재연결, broadcast 같은 반복 조작이 불편하다.
- WebTerm은 그 불편을 local-first 도구로 풀려는 시도다.

### 처음에 무엇을 착각했나

- 터미널 UI는 xterm만 붙이면 될 것처럼 보이지만, node-pty, reconnect, origin guard, remote exposure, Tauri packaging이 모두 위험 표면이다.
- remote/Cloudflare 노출은 기능이 아니라 보안 gate가 먼저다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 broadcast, git panel, auto-title, snippets, server split, remote hardening을 단계적으로 맡겼다.
- Codex review는 reconnect race, finished attention timing, timer cleanup, stale socket guard 같은 lifecycle edge를 확인하는 데 쓰였다.

### 중요한 선택

- local-only를 기본값으로 삼았다.
  - 남긴 것: local backend, allowlisted shells, origin guard.
  - 버린 것: 바로 원격 노출하는 방식.
  - 이유: shell surface는 보안 위험이 크다.

- Tauri는 build-tool prerequisite 뒤로 미뤘다.
  - 남긴 것: web dashboard 우선.
  - 버린 것: packaging을 먼저 끝내는 방식.
  - 이유: 실제 사용성 검증이 먼저다.

### 현재 상태

- Active.
- registry 기준 local tool, port 5170.
- 2026-06 diary 기준 remote auth gate, broadcast/git/auto-title/snippets/server split 등 daily-driver 기능이 진행됐다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 원격 공개/Cloudflare는 보안 hardening 이후로 보류한다.

### 남겨둔 이유

- WebTerm은 사용자의 개발 작업 표면 자체를 개선하는 도구다.
- "AI로 앱을 만든다"가 아니라 "AI와 일하는 환경을 다시 만든다"는 케이스로 쓸 수 있다.

### 내가 얻은 방식

- 개발 도구는 작은 friction 제거가 누적된다.
- terminal remote exposure는 편의보다 보안 gate가 먼저다.
- lifecycle edge는 코드만 봐서는 잘 안 보이므로 review와 e2e가 중요하다.

### 포트폴리오 각도

WebTerm은 사용자가 AI와 코딩하는 환경을 직접 도구화한 프로젝트다. 핵심은 터미널을 예쁘게 감싼 것이 아니라, 세션/재연결/보안/작업 흐름을 local-first로 다룬 점이다.

### 공개 가능 메모

- Local web terminal dashboard.
- 1/2/4 pane, xterm.js, node-pty, Tauri target.
- remote exposure before hardening is explicitly gated.

### 비공개/수정 필요 메모

- shell commands, remote tokens, local paths, security implementation details는 공개하지 않는다.

## English Machine Summary

WebTerm is a secondary portfolio candidate: a local-first web terminal cockpit
that replaces manual multi-terminal workflows while keeping remote exposure gated
behind security hardening.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:44` | registry | high | WebTerm is active, local, port 5170. |
| `projects/webterm/CLAUDE.md:3-5` | project_doc | high | Defines local web terminal dashboard replacing manual 4-split terminal. |
| `projects/webterm/CLAUDE.md:26-36` | project_doc | high | Records verification, shell allowlist, hardening checklist, and milestones. |
| `MEMORY.md:97-117` | raw_codex_log_summary | medium | Prior memories cover reconnect and lifecycle code reviews. |
| `memory/diary/2026-06-26.md`, `memory/diary/2026-06-28.md` | diary | medium | Diary records daily-driver and remote hardening work. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/webterm/CLAUDE.md
  - projects/webterm/docs/reference/build-notes.md
  - memory/diary
stale_when:
  - Remote/Cloudflare exposure status changes.
  - Tauri packaging lands.
  - Shell security policy changes.
```
