# Project Dossier: WatchBot

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: watchbot
display_name: WatchBot
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- WatchBot은 인프라 모니터링과 개인 지식 캡처를 Telegram 안에 묶은 운영 봇이다.
- 사용자는 여러 프로젝트와 봇이 살아 있는지, 실패했는지, 무엇을 메모해야 하는지를 한 인터페이스에서 보고 싶었다.

### 당시의 개인적 맥락

- 프로젝트가 많아질수록 "어느 서비스가 죽었는지"를 사람이 직접 확인하기 어렵다.
- 동시에 Telegram은 빠르게 메모하고 상태를 확인하기 쉬운 개인 운영 표면이다.
- 그래서 WatchBot은 알림기가 아니라 workspace 운영과 지식 캡처의 입구가 됐다.

### 처음에 무엇을 착각했나

- 모니터링 봇은 health check만 하면 되는 것처럼 보이지만, 실제로는 quiet hours, crash recovery, memo DB, brain context, WSL/Windows bridge가 필요했다.
- trading alert까지 한 봇에 넣으면 역할이 흐려져서 TradeBot/EventBot으로 분리했다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 WatchBot을 단순히 키우게 하지 않고, 역할 분리와 runtime boundary를 계속 확인하게 했다.
- Codex review는 bot.py 분할, poller persistence, schema guard 같은 behavior-preserving refactor에 쓰였다.

### 중요한 선택

- 운영 알림과 거래 알림을 분리했다.
  - 남긴 것: infra, GitHub, Vercel, system metrics, memos.
  - 버린 것: trading position/PnL alerts.
  - 이유: 봇의 책임이 섞이면 알림 품질이 떨어진다.

- WSL systemd service로 운영했다.
  - 남긴 것: auto-start, health API, systemd restart.
  - 버린 것: 수동 실행에 의존하는 방식.
  - 이유: 모니터링 봇은 자기 자신도 운영 대상이다.

### 현재 상태

- Active.
- registry 기준 WSL-only, port 7100, SQLite, health API.
- infra monitoring과 knowledge capture가 결합된 personal ops bot이다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- public page에서는 내부 서비스 이름과 chat/log detail을 줄이고 역할만 설명해야 한다.

### 남겨둔 이유

- WatchBot은 사용자가 AI/자동화를 생활 운영 표면으로 가져온 사례다.
- Mission Control이 dashboard라면 WatchBot은 Telegram interface다.

### 내가 얻은 방식

- 운영 알림은 역할 분리가 중요하다.
- 모니터링은 자기 자신의 liveness까지 봐야 한다.
- 빠른 메모/상태 확인 표면은 별도 앱보다 Telegram이 더 실용적일 때가 있다.

### 포트폴리오 각도

WatchBot은 개인 workspace의 운영 상태와 메모를 Telegram에서 다루는 도구다. 공개 케이스에서는 "알림 봇"보다 "개인 운영 인터페이스"로 보여주는 것이 좋다.

### 공개 가능 메모

- WSL systemd 기반 ops monitor.
- PM2/systemd/GitHub/Vercel/system metrics.
- memos and knowledge capture through Telegram.

### 비공개/수정 필요 메모

- Telegram chat ID, bot token, internal service URLs, logs는 공개하지 않는다.

## English Machine Summary

WatchBot is a secondary portfolio candidate: a WSL systemd Telegram bot that
combines infrastructure monitoring with personal knowledge capture and memo
workflows.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:41` | registry | high | WatchBot is active, WSL-only, SQLite-backed, port 7100. |
| `projects/watchbot/CLAUDE.md:3-14` | project_doc | high | Defines WatchBot as ops monitor and knowledge capture on WSL systemd. |
| `projects/watchbot/CLAUDE.md:70-115` | project_doc | high | Records runtime, commands, knowledge axis, and ecosystem role. |
| `MEMORY.md:1470-1501` | raw_codex_log_summary | medium | Prior memories cover behavior-preserving refactors and poller persistence. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/watchbot/CLAUDE.md
  - memory/diary
stale_when:
  - WatchBot runtime ownership changes.
  - Monitoring scope or knowledge capture role changes.
```
