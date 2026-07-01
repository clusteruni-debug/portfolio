# Project Dossier: TradingLab

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: tradinglab
display_name: TradingLab
registry_status: archived
inventory_status: draft
public_policy: public_candidate
```

## 한국어 본문

### 왜 시작했나

- TradingLab은 독립적인 crypto strategy lab으로 시작했다.
- 목적은 intraday execution 영역에서 독립적으로 수익화 가능한 edge가 있는지 확인하는 것이었다.
- 중요한 건 "반드시 이기는 전략을 찾는다"가 아니라, 제대로 된 검증을 통해 계속할지 멈출지 판단하는 것이었다.

### 당시의 개인적 맥락

- 사용자는 전략을 끝없이 바꿔가며 "이번에는 될지도 모른다"는 루프를 원하지 않았다.
- 동시에 얕은 테스트로 "안 된다"고 결론내리는 것도 받아들이지 않았다.
- 필요한 것은 근거 있는 중단, 또는 근거 있는 계속이었다.

### 처음에 무엇을 착각했나

- 초반의 부정적 결과만 보면 멈춰도 될 것처럼 보였지만, 일부 테스트는 실제 thesis를 제대로 검증하지 못했다.
- 더 많은 signal을 조합하면 tail 문제를 해결할 수 있을 것처럼 보였지만, 최종 판단에서는 그것이 overfitting 경로라고 봤다.
- 중앙값과 승률이 좋아도, catastrophic tail이 net result를 망치면 tradable edge라고 말할 수 없다.

### AI와 어떻게 풀었나

- 사용자는 "그냥 안 된다고 하지 말고 제대로 테스트하라"고 요구했다.
- 고정 시간 보유 테스트가 snapback thesis를 잘못 검증했다는 점을 짚고, 성급한 negative verdict를 거절했다.
- 이후 reversion-target exit로 다시 검증했고, real central edge가 있다는 점까지 확인했다.
- 하지만 tail loss가 구조적으로 걸러지지 않는다는 증거가 나오자, signal을 더 붙이는 방향을 거절했다.
- 최종적으로 "실패"가 아니라 "net-harvestable edge 없음"이라는 결정-grade verdict로 정리했다.

### 중요한 선택

- 잘못된 negative test를 그대로 받아들이지 않았다.
  - 남긴 것: thesis에 맞는 검증을 다시 요구하는 태도.
  - 버린 것: fixed-hold test 하나로 "edge 없음"이라고 결론내는 방식.
  - 이유: 나쁜 테스트는 좋은 중단 근거가 될 수 없다.

- real central edge와 tradable edge를 구분했다.
  - 남긴 것: AM-1b에서 확인된 높은 win-rate와 median snapback.
  - 버린 것: 그 숫자만으로 "전략이 된다"고 말하는 결론.
  - 이유: catastrophic tail 때문에 net-harvestable하지 않았다.

- signal-combination rescue를 거절했다.
  - 남긴 것: overfit boundary와 G3 terminal verdict.
  - 버린 것: tail event 약 10개를 설명하기 위해 filter를 계속 붙이는 방식.
  - 이유: 표본이 너무 작고 구조적으로 ambiguous해서 OOS 검증이 불가능했다.

- 프로젝트를 archive했다.
  - 남긴 것: source, plan, postmortem, 재사용 가능한 harness lesson.
  - 버린 것: 새로운 TradingLab predictive strategy plan을 자동 생성하는 루프.
  - 이유: 이 프로젝트는 결론을 내는 데 성공했다.

### 현재 상태

- Archived.
- registry는 `archive/tradinglab/`을 가리킨다.
- 공식 결론은 self-deceptive overfitting 없이 net-harvestable independent intraday-execution edge를 찾지 못했다는 것이다.
- 이 결론은 tradebot에는 적용되지 않는다. tradebot은 별도 edge class의 다른 프로젝트로 분리되어 있다.

### 폐기/보류 이유

- G3 terminal verdict 이후 archive됐다.
- real central edge는 있었지만, catastrophic tail 때문에 net-harvestable하지 않았다.
- tail sample은 너무 작고, pre-entry filter로 principled하게 걸러낼 수 없었다.
- 계속하려면 signal을 추가해 tail을 설명하는 overfit 루프로 들어갈 가능성이 높았다.

### 남겨둔 이유

- evidence-based stopping의 좋은 사례다.
- "진짜 signal이 있음"과 "운영 가능한 edge가 있음"을 분리해서 보여준다.
- 나중에 같은 종류의 strategy search가 근거 없이 재시작되는 것을 막는다.
- 포트폴리오에서는 멈춘 프로젝트가 오히려 신뢰를 만드는 사례가 될 수 있다.

### 내가 얻은 방식

- 중단도 설계할 수 있다.
- 부정적 결론은 테스트가 충실할 때만 의미가 있다.
- AI를 "계속 방법을 찾는 도구"로 쓰는 것이 아니라, 내가 세운 중단 기준을 지키게 하는 도구로 쓸 수 있다.
- 실험 프로젝트의 성공은 수익 전략 발견만이 아니라, 자기기만 없이 멈추는 것도 포함한다.

### 포트폴리오 각도

TradingLab은 AI-assisted building의 성숙한 사례로 쓸 수 있다. AI로 계속 전략을 찍어내는 대신, 사용자가 검증 기준을 세우고, 잘못된 테스트를 거절하고, real edge와 tradable edge를 분리하고, overfit 전에 멈춘 이야기다.

### 공개 가능 메모

- 실험은 archived 상태다.
- real central edge는 있었지만 net-harvestable edge는 아니었다.
- 멈춘 이유는 감정적 실패가 아니라 사전에 정의된 검증 기준과 overfit boundary다.

### 비공개/수정 필요 메모

- 금융 조언처럼 보이는 표현은 피해야 한다.
- raw strategy detail은 공개하지 않는 편이 안전하다.
- task board row나 run artifact를 그대로 공개하지 않는다.
- 2026-05-20 diary 원문은 직접 사용하지 않았고 archive docs, completed plan, postmortem, board evidence를 사용했다.

## English Machine Summary

TradingLab is archived after a G3 terminal verdict. The user rejected premature
negative conclusions, required faithful tests, confirmed a real central snapback
edge, and then stopped because the edge was not net-harvestable without
self-deceptive overfitting. The portfolio signal is disciplined stopping, not
project failure.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `config/projects.json:404-418` | registry | high | TradingLab is archived and points to `archive/tradinglab/`. |
| `archive/tradinglab/ARCHIVED.md:1-15` | project_doc | high | Records the 2026-05-20 archival and no net-harvestable edge verdict. |
| `archive/tradinglab/ARCHIVED.md:62-71` | project_doc | high | Records config disconnection and reactivation boundary. |
| `docs/postmortems/2026-05-tradinglab-retirement.md:1-15` | postmortem | high | Defines the project and terminal verdict. |
| `docs/postmortems/2026-05-tradinglab-retirement.md:35-61` | postmortem | high | Explains why the edge was real but not safely harvestable. |
| `archive/plans-completed/PLAN-TRADINGLAB-REBUILD.md:338-355` | plan | high | Records the user's challenge to the premature negative and the corrected test direction. |
| `archive/plans-completed/PLAN-TRADINGLAB-REBUILD.md:370-379` | plan | high | Records the real central edge and why it was not a pass. |
| `archive/plans-completed/PLAN-TRADINGLAB-REBUILD.md:407-437` | plan | high | Records the overfit boundary, G3 verdict, and no-new-plan rule. |
| `AGENT_TASK_BOARD.md:57-67` | board | medium | Shows repeated TradingLab tasks and later cancellation after archival. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - archive/tradinglab/ARCHIVED.md
  - docs/postmortems/2026-05-tradinglab-retirement.md
  - archive/plans-completed/PLAN-TRADINGLAB-REBUILD.md
  - AGENT_TASK_BOARD.md
stale_when:
  - TradingLab is explicitly reactivated.
  - A new hypothesis class is approved by the user.
  - Registry status changes away from archived.
  - A later postmortem supersedes the G3 verdict.
```
