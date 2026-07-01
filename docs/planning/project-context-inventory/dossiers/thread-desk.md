# Project Dossier: Thread Desk

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: thread-desk
display_name: Thread Desk
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Thread Desk는 AI 대화 thread를 캡처하고 정리하고 다시 떠올리기 위한 앱이었다.
- 시작 배경은 AI 대화가 늘어나면서 thread가 흩어지고, 나중에 다시 쓰기 어려워지는 문제였다.

### 당시의 개인적 맥락

- 사용자는 AI와 많은 대화를 하고 있었고, 그 대화를 다시 작업 자산으로 쓰고 싶었다.
- 하지만 thread capture만으로는 daily workflow가 만들어지지 않았다.

### 처음에 무엇을 착각했나

- 대화를 모으면 다시 쓸 수 있을 것처럼 보였다.
- 실제로는 모으는 것과 resurfacing해서 행동으로 연결하는 것은 다르다.
- OpenClaw worker integration도 실제 ACP가 아니라 standalone heuristic이었다.

### AI와 어떻게 풀었나

- AI는 thread, capture item, resurface event, agent job 구조를 만들 수 있었다.
- 하지만 사용자는 concept이 실제로 쓰이지 않는다는 기준으로 deprecated/archive를 선택했다.

### 중요한 선택

- 독립 thread desk를 멈췄다.
  - 남긴 것: AI 대화 기록을 다시 쓰고 싶다는 문제의식.
  - 버린 것: 별도 thread management app.
  - 이유: daily workflow 없이 capture만 늘리는 앱은 사용되지 않는다.

### 현재 상태

- Archived.
- registry 기준 archive/thread-desk에 보존되어 있다.

### 폐기/보류 이유

- 명시적 이유는 concept not actively used다.
- 좋은 포트폴리오 문맥에서는 "AI 대화를 모으는 것만으로는 충분하지 않다"는 멈춤의 이유를 보여줄 수 있다.

### 남겨둔 이유

- AI Hub나 현재 포트폴리오 인벤토리와 대비되는 archive 사례다. 같은 문제의식이 더 나은 형태로 이동했다.

### 내가 얻은 방식

- 데이터 수집은 재사용 루틴과 같이 설계되어야 한다.
- AI thread를 저장하는 것보다, 다시 사용할 순간을 만드는 것이 어렵다.

### 포트폴리오 각도

Thread Desk는 AI 사용 기록을 다루려던 초기 시도였지만, capture-only 구조가 실제 workflow로 이어지지 않아 멈춘 사례다.

### 공개 가능 메모

- AI thread capture/resurface app.
- daily workflow 부재로 archived.
- AI Hub와 대비되는 초기 실험.

### 비공개/수정 필요 메모

- 내부 table names, worker implementation detail은 공개하지 않는다.

## English Machine Summary

Thread Desk is an archive case showing that collecting AI threads is not enough
unless the resurfacing workflow fits daily use.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:16` | registry | high | Thread Desk is archived. |
| `archive/thread-desk/ARCHIVED.md:3-5` | archive_doc | high | Records deprecation and retirement reason. |
| `archive/thread-desk/ARCHIVED.md:13-22` | archive_doc | high | Describes AI thread management concept and lessons. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/thread-desk/ARCHIVED.md
  - docs/project-registry.md
stale_when:
  - Thread capture concept is revived in AI Hub or another tool.
```
