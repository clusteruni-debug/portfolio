# Project Dossier: Make Money

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: make-money
display_name: Make Money
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Make Money는 Polymarket automated trading bot과 operations dashboard를 만들려던 실험이다.
- 시작 이유는 작은 자본으로 예측시장 edge를 찾고, 여러 엔진과 AI 분석을 통해 자동화할 수 있는지 확인하려는 것이었다.

### 당시의 개인적 맥락

- 돈이 걸린 자동화는 흥미롭지만 위험하다.
- 사용자는 live trading을 바로 밀기보다 paper/live 구분, sample gate, safety system, runtime status를 계속 중요하게 다뤘다.

### 처음에 무엇을 착각했나

- 엔진을 늘리고 AI 분석을 붙이면 수익이 날 것처럼 보일 수 있다.
- 실제로는 sample size, freshness, verified PnL, live API verification, safety gate가 먼저다.
- tuning history는 live dashboard가 아니라 decision log라서 현재값을 다시 확인해야 했다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 trading engine, CEO/auditor 구조, tuning protocol, dashboard, gate readiness를 만들게 했다.
- 하지만 위험한 영역이라 자동화를 곧바로 신뢰하지 않고, sample gate와 safety mechanism을 약화하지 말라는 규칙을 뒀다.

### 중요한 선택

- live-risk를 조심스럽게 다뤘다.
  - 남긴 것: paper/live separation, sample gates, 7-layer safety system.
  - 버린 것: 검증 없는 live scaling.
  - 이유: 금융 자동화는 실험과 운영을 분리해야 한다.

- 프로젝트를 archive했다.
  - 남긴 것: 운영/분석/안전 gate의 교훈.
  - 버린 것: Make Money를 active product로 계속 유지하는 방향.
  - 이유: 더 적합한 trading/tooling 흐름은 TradeBot/TradingLab 쪽으로 이동했다.

### 현재 상태

- Archived.
- registry 기준 server/UI 모두 archive/make-money-project에 있다.
- 포트폴리오에서는 "위험한 자동화를 어떻게 조심스럽게 멈췄는가"를 보여주는 archive case다.

### 폐기/보류 이유

- active product로는 멈췄다.
- 이유는 단순 실패가 아니라 live-risk, evidence, sample gate, 현재성 검증을 통과해야 하는 영역이기 때문이다.

### 남겨둔 이유

- Make Money는 돈이 걸린 AI 자동화에서 무엇을 조심해야 하는지 보여준다.
- TradeBot/TradingLab과 함께 보면 사용자의 금융 자동화 경계가 더 선명해진다.

### 내가 얻은 방식

- 수익 자동화는 "작동"보다 "검증 가능한 edge"가 먼저다.
- tuning log는 현재 데이터가 아니다.
- safety mechanism을 약화하지 않는 규칙 자체가 중요한 산출물이다.

### 포트폴리오 각도

Make Money는 AI 자동매매를 만들다 멈춘 프로젝트다. 공개할 때는 수익 약속이 아니라, 위험한 자동화를 paper/live, sample gate, safety system으로 다뤘다는 점을 보여준다.

### 공개 가능 메모

- Polymarket AI trading experiment.
- 8 alpha engines, paper/live separation, safety gates.
- archived due to risk/evidence boundaries.

### 비공개/수정 필요 메모

- 지갑, 키, 거래 기록, 구체 전략, 수익률 주장은 공개하지 않는다.
- 금융 조언처럼 보이는 문구는 피한다.

## English Machine Summary

Make Money is an archive case about a Polymarket AI trading bot experiment. Its
portfolio value is not profit, but the user's safety gates, paper/live
separation, sample-size discipline, and decision to stop treating it as an active
product.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:11-12` | registry | high | Make Money server/UI are archived. |
| `archive/make-money-project/CLAUDE.md:5-7` | archive_doc | high | Defines Polymarket AI automated trading bot and dashboard. |
| `archive/make-money-project/CLAUDE.md:38-56` | archive_doc | high | Records live trading cautions, tuning protocol, live data, and sample gates. |
| `archive/make-money-project/MASTER_SPEC.md:13-23` | archive_doc | high | Records autonomous trading agent, 6-agent ops, and 7-layer safety system. |
| `archive/make-money-project/README.md:53-68` | archive_doc | medium | Records paper/live distinction and API status endpoints. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/make-money-project/CLAUDE.md
  - archive/make-money-project/MASTER_SPEC.md
  - docs/project-registry.md
stale_when:
  - Make Money is revived or merged into another trading project.
```
