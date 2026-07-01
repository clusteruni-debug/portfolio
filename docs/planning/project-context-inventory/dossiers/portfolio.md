# Project Dossier: Portfolio

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: portfolio
display_name: Portfolio
registry_status: active
inventory_status: draft
public_policy: public_candidate
```

## 한국어 본문

### 왜 시작했나

- 이 프로젝트는 개인 포트폴리오 사이트다.
- 목적은 "내가 만든 프로젝트 목록"을 보여주는 것에서 끝나지 않는다.
- 현재 문서상 정체성은 "만들고 쓰고 기록하는 사람"이다.
- 프로젝트 결과물보다, 사용자가 어떤 문제를 보고 어떻게 판단했는지를 담는 사이트가 되어야 한다.

### 당시의 개인적 맥락

- 사이트가 기술 전시처럼 보이면 사용자의 실제 작업 방식이 드러나지 않는다.
- 포트폴리오에 필요한 것은 프로젝트 설명만이 아니라 선택, 보류, 폐기, 검증 기준이다.
- 콘텐츠가 적은 시점에도 사이트가 비어 보이지 않아야 했다.

### 처음에 무엇을 착각했나

- "밋밋하다"는 피드백을 장식 부족으로만 해석하기 쉬웠다.
- 실제로는 콘텐츠가 없을 때 섹션이 사라지면서 페이지가 비어 보이는 구조 문제가 컸다.
- 개인 사이트에서는 빈 상태가 예외가 아니라 초기 기본 상태다.

### AI와 어떻게 풀었나

- 사용자는 "더 예쁘게"보다 "왜 비어 보이는지 먼저 보라"는 방향을 세웠다.
- AI가 효과나 장식으로 흐르기 쉬운 문제를 구조 진단으로 돌렸다.
- 기술 쇼케이스가 아니라 개인의 판단과 기록이 보이는 사이트가 되도록 방향을 고정했다.

### 중요한 선택

- 기술 포트폴리오에서 story-driven personal site로 방향을 바꿨다.
  - 남긴 것: 만들고, 쓰고, 기록하는 사람이라는 정체성.
  - 버린 것: 기술 배지와 프로젝트 나열 중심 구조.
  - 이유: 결과물보다 작업 방식과 판단이 드러나야 한다.

- 빈 섹션을 숨기지 않고 empty state를 보여주기로 했다.
  - 남긴 것: 아직 글이 없다는 상태 자체를 따뜻하게 보여주는 구조.
  - 버린 것: 콘텐츠가 없으면 `return null`로 섹션을 없애는 방식.
  - 이유: 적은 콘텐츠도 준비된 공간처럼 보여야 한다.

- 프로젝트 맥락 인벤토리는 자동 발행하지 않기로 했다.
  - 남긴 것: dossier, evidence, public candidate의 단계 분리.
  - 버린 것: raw inventory를 바로 CMS에 넣는 방식.
  - 이유: 공개 문구는 사용자가 직접 판단하고 고쳐야 한다.

### 현재 상태

- Active.
- Next.js 기반 portfolio site이고, Supabase article tag를 통해 CMS content를 렌더링한다.
- `portfolio:story:{slug}`, `portfolio:featured`, `portfolio:thought` 같은 tag convention이 있다.
- 이번 inventory 작업은 site content가 아니라 공개 후보를 만들기 전 내부 편집 재료다.

### 폐기/보류 이유

- 해당 없음. 현재 active 상태다.

### 남겨둔 이유

- 여러 프로젝트의 맥락을 모아 보여줄 자연스러운 장소다.
- 포트폴리오 사이트 자체도 "결과물 목록에서 판단 기록으로 전환한" 사례가 될 수 있다.
- 향후 approved dossier만 public candidate로 승격할 수 있는 구조를 제공한다.

### 내가 얻은 방식

- "비어 보인다"는 문제는 꾸밈보다 구조의 문제일 수 있다.
- 개인 사이트에서 empty state는 부가 기능이 아니라 첫인상이다.
- 좋은 포트폴리오는 완료한 것뿐 아니라 멈춘 이유와 선택 기준을 보여줘야 한다.

### 포트폴리오 각도

Portfolio 프로젝트는 메타 사례다. 사용자가 포트폴리오를 결과물 전시장으로 두지 않고, AI 시대에 문제를 정의하고 판단을 남기는 기록 공간으로 바꾸려는 흐름을 보여준다.

### 공개 가능 메모

- 기술 쇼케이스에서 story-driven personal site로 바뀐 흐름.
- empty state가 첫인상에 영향을 준다는 판단.
- 프로젝트 설명보다 선택과 결과를 보여주는 방향.

### 비공개/수정 필요 메모

- 내부 source path, build log, CMS 설정 세부값은 공개 문구에서 제외.
- diary 문장은 그대로 쓰지 말고 다시 써야 한다.
- AI tool 이름은 필요할 때만 보조적으로 사용한다.

## English Machine Summary

Portfolio is an active story-driven personal site. The core decision is the
identity shift from a technical showcase to a record of making, using, and
documenting. The important user-centered insight is that "bland/empty" was a
structural signal, not only a visual decoration request.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `config/projects.json:250-268` | registry | high | Portfolio is active, path is `projects/portfolio/`, verification is `npm run build`. |
| `projects/portfolio/CLAUDE.md:1-6` | project_doc | high | Defines the site as story-driven and identity-first. |
| `projects/portfolio/CLAUDE.md:25-32` | project_doc | high | Defines CMS tags for about, thoughts, stories, and featured content. |
| `projects/portfolio/CHANGELOG.md:28-40` | project_doc | high | Records identity shift and CMS integration. |
| `memory/diary/2026-06-07.md:1864-1884` | diary | high | Records the empty-state/visual improvement session and the lesson that "bland" meant structural emptiness. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/portfolio/CLAUDE.md
  - projects/portfolio/CHANGELOG.md
  - projects/portfolio/src/app/stories
  - memory/diary
stale_when:
  - Portfolio routing or CMS tag conventions change.
  - The project identity changes again.
  - A new public case-study workflow is added.
```
