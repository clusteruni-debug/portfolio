# Project Dossier: ForFitter

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: forfitter
display_name: ForFitter
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- ForFitter는 운동 프로그램을 AI로 "그럴듯하게 생성"하는 앱이 아니라, 사용자의 운동 경험과 회복, 장비, box 훈련 여부를 반영해 실제로 쓸 수 있는 프로그램을 만들려는 앱이다.
- 프로젝트 문서에는 사용자가 Decider이고, AI가 PM/Architect/Engineer/QA/Researcher/Designer 역할을 나눠 수행한다는 운영 모델이 명시되어 있다.
- 포트폴리오에서는 "AI 운동 앱"보다 "AI가 만든 결과를 사람이 어떻게 검증 가능한 제품으로 묶었는가"가 핵심이다.

### 당시의 개인적 맥락

- 기능성 피트니스는 무작위 WOD 생성만으로는 충분하지 않다. 회복, 약점 보완, 장비, 경험 수준, box 수업과의 충돌까지 고려해야 한다.
- 사용자는 public launch, 결제, legal/safety copy, 한국어 표현처럼 실제 출시에서 걸리는 문제를 AI에게 맡기지 않고 최종 판단 대상으로 남겼다.
- 운동/건강 데이터가 민감하다는 점도 프로젝트의 중요한 경계다.

### 처음에 무엇을 착각했나

- 처음에는 "AI가 운동을 짜주면 앱이 된다"고 생각하기 쉽다. ForFitter에서는 오히려 AI가 고를 수 있는 movement DB, skeleton, validation layer가 더 중요해졌다.
- Mode B는 box 훈련을 대체하는 기능이 아니라, 회복을 해치지 않는 supplementary weakness work여야 했다.
- launch readiness는 코드 green만으로 끝나지 않는다. 실제 기기 smoke, coach review, legal/payment/store proof, Decider의 한국어 리뷰가 남아 있다.

### AI와 어떻게 풀었나

- 사용자는 AI 역할을 분해했다. PM은 상태와 결정을 보여주고, Codex는 critic/reviewer/engineer 역할을 맡으며, 사용자는 Decider로 launch-critical 판단을 한다.
- AI output은 raw JSON이 아니라 Tool Use schema로 받도록 설계했다. 운동 프로그램이라는 domain에서는 "모델이 말한 텍스트"보다 검증 가능한 구조가 중요했다.
- program-quality rubric, coverage gate, persona checklist 같은 장치를 두어 AI 결과를 감으로 승인하지 않게 했다.

### 중요한 선택

- 사용자를 Decider로 고정했다.
  - 남긴 것: launch, real-money, public copy, partnership, Korean copy는 사용자 최종 승인.
  - 버린 것: AI가 제품 결정을 자동으로 끝내는 방식.
  - 이유: 건강/결제/공개 카피는 책임과 맥락이 필요한 영역이다.

- Movement DB boundary를 세웠다.
  - 남긴 것: `data/movements.json`과 validation layer.
  - 버린 것: AI가 임의 운동명을 만들어내는 방식.
  - 이유: 운동 프로그램은 창의성보다 안전하고 재현 가능한 선택지가 중요하다.

- Mode A/Mode B를 분리했다.
  - 남긴 것: full programming과 supplementary programming.
  - 버린 것: 모든 사용자를 같은 루틴으로 처리하는 방식.
  - 이유: box 훈련을 하는 사람과 혼자 운동하는 사람의 필요는 다르다.

### 현재 상태

- Active.
- registry상 React Native/Expo, Supabase pending, App Store/Google Play 대상 프로젝트다.
- 자동화 evidence는 상당 부분 green이지만, real coach review, real-device smoke, store/legal/payment, 최종 launch approval은 외부/사용자 소유 gate로 남아 있다.
- 포트폴리오에서는 "AI를 제품 품질로 끌어내리기 위해 rubric과 gate를 만든 사례"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류되는 부분은 launch claim이다. 코드와 local evidence가 있어도 건강/결제/스토어/한국어 public copy 검토가 끝나기 전에는 출시 완료라고 쓰면 안 된다.

### 남겨둔 이유

- ForFitter는 AI 생성 결과를 사람의 기준, domain boundary, 출시 gate로 묶은 좋은 main case다.
- 건강/운동/결제처럼 책임이 큰 영역에서 AI 사용 경계를 보여줄 수 있다.

### 내가 얻은 방식

- AI가 결과를 만들수록, 사용자는 더 강한 검증 구조를 가져야 한다.
- 민감한 domain에서는 프롬프트보다 boundary, schema, validation, external proof가 중요하다.
- Decider 역할을 명확히 두면 AI 협업이 덜 흐려진다.

### 포트폴리오 각도

ForFitter는 AI로 운동 루틴을 생성하는 앱이 아니라, AI 생성물을 제품으로 다루기 위해 품질 기준, 역할 분담, 검증 gate, 공개/법적 경계를 설계한 프로젝트다.

### 공개 가능 메모

- AI workout generation을 movement DB와 validation으로 묶은 사례.
- 사용자가 Decider로 남고, AI는 PM/QA/Engineer 역할을 맡은 운영 모델.
- launch readiness를 코드가 아닌 evidence gate로 본 점.

### 비공개/수정 필요 메모

- health/legal/store policy 관련 공개 문구는 최신 공식 기준 확인 전 단정하지 않는다.
- 실제 사용자/coach review나 payment proof는 공개 전 별도 확인 필요.

## English Machine Summary

ForFitter is a main portfolio candidate about turning AI-generated workout
programming into a gated product. The user acts as Decider, while AI agents take
PM, architecture, engineering, QA, research, and critique roles under explicit
launch, safety, legal, and Korean-copy boundaries.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:42` | registry | high | ForFitter is active, mobile-store targeted, with Supabase pending. |
| `projects/forfitter/CLAUDE.md:3-18` | project_doc | high | Defines the Decider and execution role model. |
| `projects/forfitter/CLAUDE.md:21-37` | project_doc | high | Describes the AI-assisted personalized workout programming app and stack. |
| `projects/forfitter/CLAUDE.md:57-102` | project_doc | high | Defines Mode A/Mode B and the local filtering doctrine. |
| `projects/forfitter/CLAUDE.md:126-136` | project_doc | high | Records compliance, sensitive data, and Tool Use output rules. |
| `projects/forfitter/CLAUDE.md:142-190` | project_doc | high | Current milestone and launch-readiness gates. |
| `MEMORY.md:615-641`, `MEMORY.md:1426-1442` | raw_codex_log_summary | medium | Prior Codex review memory covers RevenueCat, auth, program-quality rubric, and coverage gate reviews. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - docs/project-registry.md
  - projects/forfitter/CLAUDE.md
  - projects/forfitter/docs/PM-DASHBOARD.html
  - memory/diary
stale_when:
  - Launch readiness source of truth changes.
  - Real device, coach, legal, store, or payment proof lands.
  - Product mode or AI engine architecture changes.
```
