# Project Dossier: Text RPG

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: text-rpg
display_name: Text RPG
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Text RPG는 텍스트 기반 RPG 엔진과 스토리/전투/선택 구조를 만들어보려던 게임 실험이다.
- 게임을 만들고 싶다는 관심이 일찍부터 있었음을 보여주는 archive case다.

### 당시의 개인적 맥락

- 사용자는 단순한 앱뿐 아니라 narrative, combat, save/load, companion, scene JSON 같은 게임 구조도 실험했다.
- 이 경험은 이후 Maple Runner 같은 더 구체적인 게임 제작 흐름과 연결된다.

### 처음에 무엇을 착각했나

- 엔진과 구조를 만들면 게임이 되는 것처럼 보일 수 있다.
- 실제로는 콘텐츠 확장, 이미지/오디오, 밸런싱이 없으면 active project로 유지되기 어렵다.

### AI와 어떻게 풀었나

- AI는 engine/module split, scene schema, design docs 정리에 유용했을 가능성이 크다.
- 하지만 active development/usage가 없다는 기준으로 archive됐다.

### 중요한 선택

- active 개발을 멈췄다.
  - 남긴 것: scene JSON, engine/data separation, game design docs.
  - 버린 것: 계속 확장해야 하는 game content backlog.
  - 이유: 구조만으로는 playable product가 유지되지 않는다.

### 현재 상태

- Archived.
- archive/ramgtd-text-rpg에 engine/docs가 보존되어 있다.

### 폐기/보류 이유

- 명시적 이유는 no active development or usage다.
- 공개에서는 초기 게임 실험 묶음으로만 다루면 충분하다.

### 남겨둔 이유

- Text RPG는 게임 제작 관심의 초기 흔적이다.
- Maple Runner와 Random Defense를 설명할 때 "게임 실험이 한 번으로 끝나지 않았다"는 맥락을 준다.

### 내가 얻은 방식

- 게임은 엔진보다 콘텐츠와 반복 플레이가 어렵다.
- scene/data 분리는 좋은 시작이지만, 계속 만들 이유가 있어야 한다.

### 포트폴리오 각도

Text RPG는 초기 게임 실험 archive다. 큰 case-study보다는 "게임 제작 관심의 시작점"으로 짧게 쓰는 편이 좋다.

### 공개 가능 메모

- Vite/Vanilla JS text RPG engine.
- scene JSON, combat, save/load, companion system.
- archived due to no active development.

### 비공개/수정 필요 메모

- 미완성 스토리나 내부 design prompt는 공개 전 선별한다.

## English Machine Summary

Text RPG is an archive case: an early game-engine experiment with scene JSON,
combat, save/load, and narrative systems, retired because development and usage
did not continue.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:24` | registry | high | Text RPG is archived. |
| `archive/ramgtd-text-rpg/ARCHIVED.md:1-4` | archive_doc | high | Records retirement and reason. |
| `archive/ramgtd-text-rpg/CLAUDE.md:1-35` | archive_doc | high | Defines engine stack, structure, and scene files. |
| `archive/ramgtd-text-rpg/CLAUDE.md:64-90` | archive_doc | high | Records scene schema, design authority, and next backlog. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/ramgtd-text-rpg/ARCHIVED.md
  - archive/ramgtd-text-rpg/CLAUDE.md
  - docs/project-registry.md
stale_when:
  - Text RPG is revived or merged into a new game project.
```
