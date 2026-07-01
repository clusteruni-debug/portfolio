# Project Dossier: Care Memory

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: care-memory
display_name: Care Memory
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Care Memory는 중요한 사람들과의 관계, 의미 있는 순간, 연결 히스토리를 기록하려던 앱이다.
- 시작 이유는 관계를 잘 관리하려는 좋은 의도였지만, 기록 도구로 만들기 어려운 영역이기도 했다.

### 당시의 개인적 맥락

- 관계 기록은 민감하고, 입력 계기가 자연스럽지 않으면 계속 쓰기 어렵다.
- local-only IndexedDB는 privacy에는 맞지만 cross-device adoption에는 불리했다.

### 처음에 무엇을 착각했나

- 관계를 기록하면 더 잘 챙길 수 있을 것처럼 보였다.
- 실제로는 기록 trigger가 없으면 앱이 열리지 않는다.

### AI와 어떻게 풀었나

- AI는 IndexedDB repository pattern과 UI 구조를 만들 수 있었지만, 사용자의 daily habit trigger를 대신 만들지는 못했다.
- 사용자는 active usage가 없다는 기준으로 archive했다.

### 중요한 선택

- 관계 기록 앱 운영을 멈췄다.
  - 남긴 것: 관계를 챙기려는 문제의식.
  - 버린 것: local-only standalone app.
  - 이유: 민감한 기록 도구는 강한 trigger가 없으면 유지되지 않는다.

### 현재 상태

- Archived.
- no persistent data to preserve였고, archive/care-memory에 보존되어 있다.

### 폐기/보류 이유

- 명시적 이유는 no active usage와 daily routine 미채택이다.
- 실패가 아니라, 습관으로 붙지 않는 민감 도구를 멈춘 판단이다.

### 남겨둔 이유

- Care Memory는 개인 도구에서 privacy와 adoption이 충돌하는 사례로 남길 가치가 있다.

### 내가 얻은 방식

- 민감한 기록 앱은 privacy만으로 충분하지 않다.
- 기록 trigger와 cross-device flow가 없으면 좋은 의도도 이어지지 않는다.

### 포트폴리오 각도

Care Memory는 관계 기록이라는 좋은 목적이 있어도 실제 사용 습관이 없으면 archive하는 것이 맞다는 사례다.

### 공개 가능 메모

- Relationship care recording app.
- local IndexedDB, no server-side data.
- no daily trigger, archived.

### 비공개/수정 필요 메모

- 실제 관계/사람 이름/기록 내용은 공개하지 않는다.

## English Machine Summary

Care Memory is an archive case about a relationship-care recording app that was
retired because sensitive standalone tracking did not become a daily routine.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:40` | registry | high | Care Memory is archived. |
| `archive/care-memory/ARCHIVED.md:3-11` | archive_doc | high | Records retirement, local IndexedDB, and no persistent data. |
| `archive/care-memory/ARCHIVED.md:13-20` | archive_doc | high | Describes relationship care tracking and habit-trigger lessons. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/care-memory/ARCHIVED.md
  - docs/project-registry.md
stale_when:
  - Relationship tracking returns through another workflow.
```
