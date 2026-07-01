# Project Dossier: Decision Atlas

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: decision-atlas
display_name: Decision Atlas
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Decision Atlas는 개인의 의사결정을 기록하고, 나중에 결과를 돌아보며 판단 품질을 개선하려는 앱이었다.
- 시작 아이디어 자체는 포트폴리오에 좋다. AI 시대에는 "무엇을 만들었나"보다 "어떻게 판단했나"가 중요하기 때문이다.

### 당시의 개인적 맥락

- 사용자는 여러 프로젝트를 동시에 하면서 선택과 판단을 남길 필요가 있었다.
- 하지만 별도 앱에 결정을 입력하는 습관은 실제 daily workflow에 붙지 않았다.

### 처음에 무엇을 착각했나

- 의사결정 기록은 좋은 기능이면 쓸 것처럼 보였다.
- 실제로는 capture workflow가 Obsidian, Telegram, diary 같은 기존 흐름 안에 들어와야 했다.

### AI와 어떻게 풀었나

- AI는 decision/review/insight 구조를 만들 수 있었지만, 사용자가 실제로 기록하는 진입점 문제를 대신 해결하지는 못했다.
- archive 문서에는 archival process 자체의 검증 오류도 남아 있다. 이 점은 "멈춤도 검증해야 한다"는 교훈이 된다.

### 중요한 선택

- 독립 앱 운영을 멈췄다.
  - 남긴 것: decision capture/review loop라는 개념.
  - 버린 것: 별도 decision app을 daily tool로 계속 운영하는 방식.
  - 이유: 습관 진입점이 없으면 좋은 기능도 쓰이지 않는다.

- archive factual correction을 남겼다.
  - 남긴 것: 실제 Supabase instance/table/drop status correction.
  - 버린 것: archive 문서의 첫 기록을 그대로 믿는 방식.
  - 이유: 폐기 기록도 source verification이 필요하다.

### 현재 상태

- Archived.
- registry 기준 archive/decision-atlas에 보존되어 있다.
- 포트폴리오에서는 "좋은 아이디어였지만 daily workflow에 붙지 않아 멈춘 사례"로 쓰기 좋다.

### 폐기/보류 이유

- 명시적 폐기 이유는 no active usage와 daily habit 미통합이다.
- 실패가 아니라, 독립 앱으로 둘 때 사용자가 실제로 쓰지 않는다는 기준으로 멈춘 것이다.

### 남겨둔 이유

- Decision Atlas는 현재 포트폴리오 인벤토리 방향과 직접 연결된다. 판단 기록의 필요는 남았고, 구현 형태만 바뀌었다.

### 내가 얻은 방식

- 좋은 기록 도구도 입력 진입점이 없으면 죽는다.
- archive 문서도 검증 대상이다.
- 판단 기록은 독립 앱보다 이미 쓰는 workflow 안에 붙어야 한다.

### 포트폴리오 각도

Decision Atlas는 "멈춘 이유가 신뢰를 만드는" 대표 사례다. 사용자는 좋은 아이디어라도 실제 습관으로 붙지 않으면 archive했다.

### 공개 가능 메모

- Decision capture/review/insight app.
- daily workflow에 붙지 않아 archived.
- 판단 기록의 필요는 포트폴리오 인벤토리로 이어짐.

### 비공개/수정 필요 메모

- Supabase instance/table detail과 row count correction은 public page에서는 요약만 한다.

## English Machine Summary

Decision Atlas is an archive case: a decision tracking app whose concept remains
valuable, but the standalone capture workflow did not become a daily habit.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:15` | registry | high | Decision Atlas is archived. |
| `archive/decision-atlas/ARCHIVED.md:3-11` | archive_doc | high | Records retirement date, no active usage, and archival corrections. |
| `archive/decision-atlas/ARCHIVED.md:14-22` | archive_doc | high | Defines what it was, what worked, and habit-integration lessons. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/decision-atlas/ARCHIVED.md
  - docs/project-registry.md
stale_when:
  - Decision logging returns in another active tool.
```
