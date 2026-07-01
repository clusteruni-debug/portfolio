# Project Dossier: Maple Story: Hero's Road

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: maple-auto-runner
display_name: "Maple Story: Hero's Road"
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- 시작 이유는 사용자의 직접 정정으로 확인됐다. Verse8에서 진행하는 MSU 이벤트에 참여했고, 그 계기로 실제 게임을 만들어보고 싶었다.
- 초벌 작업은 Verse8에서 진행됐다. 이후 workspace에는 단순 문서가 아니라, 게임을 계속 밀어붙이기 위한 프롬프트, 기획, 그래픽, 검수, 실행 순서, 외부 GitLab handoff가 쌓였다.
- 포트폴리오에서는 "외부 도구에서 만든 결과물"이 아니라, 외부 이벤트를 계기로 창작 욕구를 실제 게임 제작 흐름으로 옮긴 사례로 다뤄야 한다.

### 당시의 개인적 맥락

- 사용자는 단순한 데모나 템플릿이 아니라, 게임처럼 보이고 게임처럼 느껴지는 결과물을 원했다.
- 불안의 형태는 "콘텐츠 부족해서 수상 못한다"였다. 이 불안을 기능을 더 붙이는 방향이 아니라, 대회 구조와 심사 기준을 보고 깊이와 폴리시 문제로 재해석했다.
- 작업은 Verse8, Claude Code, Codex, 외부 repo, workspace 문서가 섞인 형태였다. 그래서 "어디가 source of truth인가"와 "무엇이 실제 화면으로 검증됐는가"가 계속 중요해졌다.

### 처음에 무엇을 착각했나

- 처음엔 코드/문서상으로 개선이 많으면 품질도 올라갔다고 보기 쉬웠다. 하지만 그래픽 프로젝트에서는 source check만으로 화면 품질을 증명할 수 없었다.
- `projects/maple-auto-runner`가 operationally docs/control packet처럼 보인다고 해서 포트폴리오에서 제외하면 안 된다. 실제 창작 프로젝트의 맥락은 Verse8 export와 외부 GitLab repo까지 이어졌다.
- MSU asset을 pixel art처럼 다루는 것도 착각이었다. diary에는 MSU 메이플 에셋이 부드러운 일러스트라 `pixelArt:true`가 저해상도처럼 보이게 만든다는 교훈이 남아 있다.
- Codex가 source patch를 많이 했다고 해서 완료는 아니었다. 빌드, 스크린샷, CDP/브라우저 검증이 없으면 그래픽 완성도 주장은 보류해야 했다.

### AI와 어떻게 풀었나

- 사용자는 "먼저 검토하고 PLAN을 세우라"는 방식으로 접근했다. 그래픽, 시스템/기획, QA/검수를 나누고, 한 모델의 단독 판단으로 끝내지 않게 했다.
- Codex는 source patch와 문서/프롬프트 정리를 맡았고, Claude Code는 PM, 기획, 비판, 런타임/스크린샷 검증을 더 강하게 맡았다.
- 사용자는 R8 단계에서 완료 판단을 취소하고 R9 "90점 목표"를 다시 열었다. 이 점이 중요하다. AI가 한 결과를 그대로 승인하지 않고, 실제 화면 기준에 못 미치면 목표를 닫지 않았다.
- 공식 MSU asset 사용 원칙을 세웠다. 코드로 그린 UI나 임의 장식 대신, official/local MSU asset audit, named missing asset fetch, PNG support art, runtime screenshot을 기준으로 삼았다.
- Verse8 GitLab push도 사용자가 직접 필요를 정했다. "집에서 봐야 하니 gitlab push"라는 흐름으로 이전의 push 금지 상태가 해제됐다.

### 중요한 선택

- Maple Runner를 메인 포트폴리오 케이스로 포함한다.
  - 남긴 것: Verse8/MSU 이벤트 참여에서 시작한 게임 제작 맥락.
  - 버린 것: "외부 문서 패킷이니 본편 제외"라는 운영 분류.
  - 이유: 포트폴리오 기준은 workspace 내부 소유권보다 사용자의 시작 이유, 선택, 결과, 검증 방식이다.

- 게임잼 전략은 분량보다 깊이와 폴리시로 잡았다.
  - 남긴 것: Vibe Camp, 카테고리 수상, idle/auto-battle 장르를 고려한 8일 우선순위.
  - 버린 것: 콘텐츠를 무작정 늘리는 방향.
  - 이유: 1라운드에서는 완성도와 심사 기준 대응이 더 중요했다.

- 그래픽 완료 주장을 보류했다.
  - 남긴 것: source verification, asset audit, browser/CDP proof.
  - 버린 것: "source patch가 많으니 90점 달성"이라는 완료 판단.
  - 이유: 그래픽은 실제 화면, 겹침, missing texture, 콘솔 에러, 시각 밀도가 증거다.

- 공식 MSU asset 우선 원칙을 세웠다.
  - 남긴 것: real `msuAsset()` path, local MSU resources, official map/back assets, support PNG.
  - 버린 것: hand-drawn Phaser Graphics, generic SVG-only look, 임의 asset path.
  - 이유: MSU 이벤트 참여작이면 시각 자산의 정체성과 라이선스/출처가 중요했다.

### 현재 상태

- Active.
- workspace registry상 profile은 `external_doc_packet`이고 deploy는 `Verse8 (external) / GitLab`이다.
- 포트폴리오상 분류는 main case다. operational profile이 외부 패킷이라는 사실은 숨기지 않되, "내가 만든 프로젝트"에서 제외하는 근거로 쓰지 않는다.
- 2026-06-26 diary에는 잼 제출 전 gameplay economy/progression cross-model review와 runtime/CDP 검증 근거가 남아 있다.
- 남은 경계는 visual quality와 Verse8 server integration 일부다. 특히 user-side runtime/visual review가 필요한 항목은 공개 문장에서 과장하면 안 된다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류된 부분은 "완성도 주장"이다. 그래픽 90점 목표는 source상 많이 밀었지만, 실제 화면 검증 전에는 완료로 닫지 않는다는 기록이 남아 있다.

### 남겨둔 이유

- 이 프로젝트는 사용자가 AI를 단순 구현 도구로 쓰지 않고, 창작 욕구, 이벤트 참여, 품질 기준, 검증 루프를 함께 운영한 사례다.
- "AI가 만든 게임"이 아니라 "사용자가 AI와 외부 제작 플랫폼을 엮어 게임다운 결과물을 만들려고 계속 기준을 올린 과정"을 보여준다.
- My1RM이 작은 공개 도구 사례라면, Maple Runner는 취향과 창작 욕구에서 출발한 게임 제작 사례다.

### 내가 얻은 방식

- 게임 작업은 source 검증과 runtime 검증을 분리해야 한다.
- 시각 품질은 말로 설득할 수 없고, 화면으로 봐야 한다.
- AI가 많은 패치를 했더라도 사용자가 보는 기준에 못 미치면 목표는 닫지 않는다.
- 외부 플랫폼에서 시작한 작업도, 사용자가 목적과 기준을 세우고 계속 끌고 갔다면 포트폴리오의 핵심 프로젝트가 될 수 있다.

### 포트폴리오 각도

Maple Runner는 Verse8의 MSU 이벤트 참여를 계기로 "게임을 만들어보고 싶다"는 욕구를 실제 작업으로 옮긴 창작 프로젝트다. 초벌은 Verse8에서 시작됐고, 이후에는 AI와 함께 게임 기획, 그래픽 품질, 공식 에셋 사용, cross-model review, runtime proof를 계속 요구하면서 프로젝트를 끌고 갔다.

### 공개 가능 메모

- Verse8/MSU 이벤트 참여 계기로 시작한 Maple-style auto-runner.
- 외부 플랫폼 초벌 작업 이후, 기획/그래픽/검수/검증 흐름을 직접 설계.
- 공식 MSU asset 우선, 임의 hand-drawn 대체 지양.
- source patch와 runtime proof를 분리해서 완성도 주장을 관리.
- "수상 전략"은 기능 확장이 아니라 심사 구조, 깊이, 폴리시 기준으로 재해석.

### 비공개/수정 필요 메모

- diary 원문, 내부 path, 외부 repo 세부 경로, job id는 공개 문장에 그대로 쓰지 않는다.
- Nexon/Nexpace/MSU 관련 공개 표현은 이벤트 참여 맥락 수준으로만 사용하고, 제휴/공식 승인처럼 보이지 않게 한다.
- "그래픽 90점" 같은 내부 목표 수치는 공개 문장에서는 정성적 표현으로 바꾼다.
- runtime 검증이 남은 부분은 현재 상태로 과장하지 않는다.

## English Machine Summary

Maple Story: Hero's Road is a main portfolio candidate. It started because the
user joined a Verse8 MSU event and wanted to make an actual game. Although the
workspace profile calls the folder an external documentation/control packet, the
portfolio story is user-owned: the user drove game direction, contest strategy,
MSU asset policy, graphics quality, cross-model review, and runtime proof
boundaries across Verse8, workspace docs, and an external GitLab repo.

## Evidence

| Evidence ID | Source | Role / Signal | Sections | Confidence | Summary |
| --- | --- | --- | --- | --- | --- |
| `maple-user-correction-20260628` | current conversation, 2026-06-28 user correction | user_turn / why | why_started, portfolio_angle | high | User clarified that the project belongs in the portfolio and started from joining a Verse8 MSU event because they wanted to make a game. |
| `maple-registry-current` | `config/projects.json:715-733`, `docs/project-registry.md:49` | project_fact / status | current_state | high | Registry marks Maple Story: Hero's Road active, path `projects/maple-auto-runner/`, profile `external_doc_packet`, deploy `Verse8 (external) / GitLab`. |
| `maple-project-instructions` | `projects/maple-auto-runner/CLAUDE.md:1-15`, `projects/maple-auto-runner/AGENTS.md:1-30` | project_fact / boundary | current_state, important_decisions | high | Project docs define it as a MapleStory Universe Vibe Camp jam entry and require MSU asset/structure audit. |
| `maple-diary-20260621-strategy` | `memory/diary/2026-06-21.md:702-718` | diary / strategy, user_judgment | why_started, personal_context, important_decisions | high | Records game planning, growth model, story/balance/backend, Vibe Camp/Nexon/Nexpace/NXPC context, and the user's content-depth judgment. |
| `maple-diary-20260622-verse8` | `memory/diary/2026-06-22.md:348-360` | diary / correction, workflow | ai_interaction, important_decisions | high | Records comparing the latest Verse8 export with docs and writing MSU resource/graphics repair prompts. |
| `maple-diary-20260622-resource-policy` | `memory/diary/2026-06-22.md:406-418` | diary / decision | important_decisions | high | Records the official/local MSU resource-first plan and separation of GPT support images from official assets. |
| `maple-diary-20260624-r6-r9` | `memory/diary/2026-06-24.md:266-284`, `memory/diary/2026-06-24.md:355-375` | diary / implementation, verification_boundary | ai_interaction, current_state | high | Records official execution order, MSU asset audit, source patching, and the decision not to mark 90-point graphics complete without runtime visual proof. |
| `maple-diary-20260625-reality-check` | `memory/diary/2026-06-25.md:82-100` | diary / correction, lesson | initial_assumptions, what_i_learned | high | Records claim-vs-measurement review, build/screenshots, graphics fixes, and Codex limitation analysis. |
| `maple-diary-20260625-gitlab` | `memory/diary/2026-06-25.md:440-461` | diary / status, workflow | current_state, ai_interaction | high | Records Verse8 GitLab push after user approval and the governance lesson around Codex adversarial review. |
| `maple-diary-20260626-jam-review` | `memory/diary/2026-06-26.md:365-377` | diary / pre-submission verification | current_state, important_decisions | high | Records pre-jam gameplay/economy/progression review, fixes, runtime proof, and CDP visual verification. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - docs/project-registry.md
  - projects/maple-auto-runner/CLAUDE.md
  - projects/maple-auto-runner/AGENTS.md
  - projects/maple-auto-runner/README.md
  - projects/maple-auto-runner/DECISIONS.md
  - memory/diary
stale_when:
  - Registry status or profile changes.
  - Verse8/GitLab deployment state changes.
  - New runtime screenshots or visual review supersede the R9 pause/proof state.
  - Jam submission status or public result changes.
  - User revises the starting motivation or publication boundary.
```
