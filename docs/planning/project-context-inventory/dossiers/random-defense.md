# Project Dossier: Random Defense

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: random-defense
display_name: Random Defense
registry_status: archived
inventory_status: draft
public_policy: public_candidate
portfolio_priority: archive_case
```

## 한국어 본문

### 왜 시작했나

- Random Defense는 crypto-themed random defense/tower defense 브라우저 게임 프로토타입이다.
- 사용자는 단순 앱이 아니라 core loop, tier ladder, merge/crafting, story operation 같은 게임 시스템을 설계해보고 싶었다.

### 당시의 개인적 맥락

- 이 프로젝트는 초기 게임 실험 중에서도 시스템 설계 문서가 많이 남은 편이다.
- Maple Runner와 함께 보면, 사용자가 게임을 만들고 싶다는 욕구를 여러 형태로 실험했다는 맥락이 생긴다.

### 처음에 무엇을 착각했나

- 많은 디자인 문서와 asset이 있으면 게임이 완성에 가까워 보일 수 있다.
- 실제로는 core loop playtest, roster breadth, production art가 이어져야 active game이 된다.

### AI와 어떻게 풀었나

- AI는 game design docs, enemy/boss/recipe/story specs, visual roadmap 정리에 유용했을 가능성이 크다.
- 하지만 prototype stage에서 active development가 멈춰 archive됐다.

### 중요한 선택

- prototype으로 보존하고 active 개발은 멈췄다.
  - 남긴 것: core loop, design docs, tier system, asset direction.
  - 버린 것: production game으로 계속 밀어붙이는 방향.
  - 이유: playtest와 art/content 확장이 없으면 prototype 이상으로 보기 어렵다.

### 현재 상태

- Archived.
- static browser game prototype으로 archive/Random-defense-project에 보존되어 있다.

### 폐기/보류 이유

- 명시적 이유는 prototype stage, no active development다.
- 공개에서는 실패가 아니라 "초기 게임 시스템 실험"으로 정리한다.

### 남겨둔 이유

- Random Defense는 게임 시스템을 설계하고 문서화한 흔적이 풍부하다.
- Maple Runner의 더 구체적인 게임 제작 사례와 대비되는 prototype layer다.

### 내가 얻은 방식

- 게임은 시스템 문서와 playable loop 검증이 함께 필요하다.
- prototype을 archive하는 것도 선택이다.
- 아이디어가 많아도 active development 기준이 없으면 멈추는 것이 낫다.

### 포트폴리오 각도

Random Defense는 crypto-themed defense game prototype이다. 큰 main case보다는 archive strip에서 "게임 시스템을 실험했지만 prototype 단계에서 멈춘 프로젝트"로 쓰기 좋다.

### 공개 가능 메모

- Static HTML/CSS/JS defense prototype.
- summon, merge, recipe, story operation core loop.
- archived at prototype stage.

### 비공개/수정 필요 메모

- 외부 asset attribution과 crypto brand/logo 표현은 공개 전 검토한다.

## English Machine Summary

Random Defense is an archive case: a static crypto-themed defense game prototype
with substantial system/design documentation, retired at the prototype stage.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:39` | registry | high | Random Defense is archived. |
| `archive/Random-defense-project/ARCHIVED.md:3-4` | archive_doc | high | Records retirement and prototype-stage reason. |
| `archive/Random-defense-project/README.md:1-9` | archive_doc | high | Defines prototype and core loop. |
| `archive/Random-defense-project/README.md:51-93` | archive_doc | high | Records no-build static setup, design documents, and early prototype status. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - archive/Random-defense-project/ARCHIVED.md
  - archive/Random-defense-project/README.md
  - docs/project-registry.md
stale_when:
  - Random Defense is revived or merged into a new game project.
```
