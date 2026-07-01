# Project Dossier: Asset Manager

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: asset-manager
display_name: Asset Manager
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- Asset Manager는 Web3 수입/지출, 자산, 예산, 목표, 손실을 한 곳에서 보려는 개인 재무 장부다.
- 단순 가계부보다 동기 유지와 위험 억제 장치를 함께 두려는 방향이 강하다.

### 당시의 개인적 맥락

- 수익/지출과 투자 손익은 숫자만 있으면 딱딱해지고, 관리 동기가 쉽게 떨어진다.
- RPG tab, streak, quests, futures loss tracking 같은 구조는 돈 관리를 게임처럼 지속하게 하려는 시도다.

### 처음에 무엇을 착각했나

- 재무 도구는 거래 입력과 차트만 있으면 될 것처럼 보인다. 실제로는 예산, 반복지출, 목표, 카테고리, 알림, gamification이 함께 있어야 오래 쓴다.
- 금액과 사용자 데이터는 RLS와 user_id filter가 빠지면 위험하다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 UI 개선을 맡길 때도 CSS-only 같은 강한 scope를 걸었다.
- BankSalad/Toss류의 calm-flat 방향을 참고하되, 기존 기능과 데이터 구조를 유지하는 방식으로 다뤘다.

### 중요한 선택

- RPG gamification을 남겼다.
  - 남긴 것: boss card, streak, quests, RPG data.
  - 버린 것: 순수 회계장부형 화면.
  - 이유: 개인 재무 관리는 감정과 동기 유지가 중요하다.

- amounts를 KRW integer로 저장한다.
  - 남긴 것: 단순하고 명확한 저장 단위.
  - 버린 것: floating amount model.
  - 이유: 돈 데이터는 반올림/정밀도 오류가 작아도 신뢰를 깎는다.

### 현재 상태

- Active.
- registry 기준 Vercel/Supabase, port 5140.
- 보조 포트폴리오 케이스로는 "생활형 재무 도구에 동기와 위험 억제를 넣은 사례"가 적합하다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 공개 문장에서는 실제 자산/수입/손실 데이터는 절대 쓰지 않는다.

### 남겨둔 이유

- Asset Manager는 개인 생활 데이터와 제품 감각이 만나는 도구다.
- AI를 UI polish와 구조 정리에 쓰되, 데이터 경계는 유지한 사례다.

### 내가 얻은 방식

- 개인 재무 도구는 정확성과 지속 동기가 같이 필요하다.
- CSS-only scope처럼 변경 범위를 제한하면 큰 앱도 안전하게 다듬을 수 있다.
- 돈 데이터는 공개 포트폴리오에서 기능만 말하고 내용은 숨겨야 한다.

### 포트폴리오 각도

Asset Manager는 단순 재무 대시보드가 아니라, 사용자가 자산 관리를 계속하게 만드는 개인 도구다.

### 공개 가능 메모

- Web3 income ledger.
- budget/subscription/goal/calendar/futures/RPG tools.
- calm-flat UI direction.

### 비공개/수정 필요 메모

- 실제 금액, 계좌, 지갑, 수익률, 거래 내역은 공개하지 않는다.

## English Machine Summary

Asset Manager is a secondary portfolio candidate about personal Web3/finance
tracking with budgeting, goals, recurring items, futures-loss tracking, and RPG
motivation mechanics.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:27` | registry | high | Active Vercel/Supabase project on port 5140. |
| `projects/asset-manager/CLAUDE.md:1-15` | project_doc | high | Defines Web3 Income Ledger stack and structure. |
| `projects/asset-manager/CLAUDE.md:28-56` | project_doc | high | Records RPG tab and RPG data support. |
| `projects/asset-manager/CLAUDE.md:95-108` | project_doc | high | Records futures loss styles, RLS, and integer KRW storage. |
| `MEMORY.md:1515-1548` | raw_codex_log_summary | medium | Prior memories cover CSS-only and design review scope boundaries. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/asset-manager/CLAUDE.md
  - memory/diary
stale_when:
  - Data model or privacy boundary changes.
  - RPG/gamification model changes.
```
