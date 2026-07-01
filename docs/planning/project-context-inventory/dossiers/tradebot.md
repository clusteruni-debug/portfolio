# Project Dossier: TradeBot

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: tradebot
display_name: TradeBot
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- TradeBot은 김치 프리미엄에서 출발했지만, 현재는 거래 아이디어, paper loop, 알림, runtime safety를 묶는 trading intelligence bot이다.
- 사용자의 필요는 live money를 바로 태우는 것이 아니라, 시장 관찰과 paper evidence를 쌓으며 자기기만을 줄이는 것이었다.

### 당시의 개인적 맥락

- 거래 영역은 숫자와 현재 시장 상태가 쉽게 바뀐다.
- 사용자는 "돈 벌 수 있다"는 주장보다, alert 품질, feed freshness, paper 결과, runtime proof를 더 중요하게 다뤘다.
- Make Money와 TradingLab이 archive된 뒤에도 TradeBot은 운영형 관찰/알림 도구로 남았다.

### 처음에 무엇을 착각했나

- 시장 데이터는 과거 지식으로 말할 수 없다. current market value는 web/reference-first 규칙이 필요했다.
- paper loop도 검증 없이 반복하면 실전 edge가 아니라 착각을 강화할 수 있다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 alert, runtime settings, paper DB cleanup, sniper checks를 검토하게 했다.
- Codex review는 delivery retry-loss, repeat-alert risk, PM2/runtime proof 같은 운영 위험을 찾는 데 쓰였다.

### 중요한 선택

- paper와 live를 분리했다.
  - 남긴 것: paper engine, risk gates, logs, replay/status checks.
  - 버린 것: 바로 live execution으로 넘어가는 흐름.
  - 이유: 금융/거래 영역은 evidence 없는 자신감이 가장 위험하다.

- current market fact는 web/reference-first로 묶었다.
  - 남긴 것: reference docs와 live verification rule.
  - 버린 것: 모델 기억 기반 시장 판단.
  - 이유: 시장 값은 시간에 따라 빠르게 바뀐다.

### 현재 상태

- Active.
- registry 기준 Win-only server/sniper/UI가 있고, SQLite/local runtime을 쓴다.
- 포트폴리오에서는 "거래 자동화"보다 "위험한 영역에서 검증과 paper loop를 우선한 운영 도구"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- live-profit claim은 보류해야 한다. 공개 문장에서는 수익 약속이 아니라 risk/evidence/control을 말해야 한다.

### 남겨둔 이유

- TradeBot은 사용자가 AI를 위험 감수 확대가 아니라 위험 통제와 관찰 강화에 쓴 사례다.

### 내가 얻은 방식

- 금융 도구에서는 "현재성"과 "검증 가능한 evidence"가 핵심이다.
- alert는 보내는 것보다 중복/누락/오탐을 줄이는 것이 어렵다.
- AI에게 시장 판단보다 검증 경계와 운영 리스크를 묻는 것이 더 안전하다.

### 포트폴리오 각도

TradeBot은 거래 자동화를 무작정 밀어붙인 프로젝트가 아니라, paper loop와 runtime 검증을 통해 위험한 아이디어를 천천히 다룬 도구로 보여주는 것이 좋다.

### 공개 가능 메모

- Trading intelligence Telegram bot.
- paper trading, alert, risk gates, runtime checks.
- current market facts는 live/reference-first.

### 비공개/수정 필요 메모

- 거래 전략, live DB, alert target, token/market 세부는 공개하지 않는다.
- 수익/추천처럼 보이는 문장은 금지한다.

## English Machine Summary

TradeBot is a secondary portfolio candidate about trading intelligence with
paper loops, alerts, runtime checks, and current-market verification boundaries,
not a public profit claim.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:20-22` | registry | high | Active Win-only server/sniper/UI surfaces. |
| `projects/tradebot/CLAUDE.md:1-5` | project_doc | high | Defines TradeBot as unified trading intelligence and notes Make Money archival. |
| `projects/tradebot/CLAUDE.md:40-44`, `projects/tradebot/CLAUDE.md:91-116` | project_doc | high | Records paper trading, strategies, monitoring, and learning engine. |
| `projects/tradebot/CLAUDE.md:137-142` | project_doc | high | Current market values require web/reference-first handling. |
| `MEMORY.md:1206-1255` | raw_codex_log_summary | medium | Prior memories cover paper DB cleanup, runtime restart, alert review, and settings risks. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/tradebot/CLAUDE.md
  - projects/tradebot/docs/alerts.md
  - memory/diary
stale_when:
  - Runtime mode changes.
  - Alert catalog or current market reference policy changes.
  - Live-money status changes.
```
