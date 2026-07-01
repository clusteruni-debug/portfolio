# Project Dossier: Saitama Training

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: saitama-training
display_name: Saitama Training
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- Saitama Training은 One Punch Training 테마를 운동 지속 구조로 바꾸려는 PWA다.
- 포트폴리오에서는 팬심/테마보다, 루틴을 재미있게 유지하기 위해 progression, RPE, volume adjustment를 넣은 점이 중요하다.

### 당시의 개인적 맥락

- 운동 앱은 정확한 루틴만으로 지속되지 않는다.
- 테마, progress, level-up, feedback, Firebase sync가 함께 있어야 다시 돌아올 이유가 생긴다.

### 처음에 무엇을 착각했나

- 게임화는 캐릭터/색만 넣는다고 되는 것이 아니다.
- 실제 운동 기록 저장, RPE feedback, volume auto-adjustment, progressive overload가 있어야 지속 구조가 된다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 운동 루틴을 단순 화면으로 만들게 하기보다, methodology와 plan/progression 구조를 분리하게 했다.
- AI는 컴포넌트 분리, progression tree, coach logic, Firebase sync 구조화에 쓰인 것으로 볼 수 있다.

### 중요한 선택

- Saitama theme을 실제 training method와 연결했다.
  - 남긴 것: progressive overload, RPE, level-up, deload, rest time.
  - 버린 것: 단순 캐릭터 테마 앱.
  - 이유: 재미와 운동 원리가 함께 있어야 유지된다.

- Firebase sync를 남겼다.
  - 남긴 것: workout records and auth.
  - 버린 것: local-only 기록.
  - 이유: 운동 기록은 장기 추적이 중요하다.

### 현재 상태

- Active.
- registry 기준 Firebase/GitHub Pages 프로젝트, port 5130.
- 보조 케이스로는 "테마를 지속 가능한 운동 구조로 바꾼 PWA"가 적합하다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 공개 문장에서는 저작권/브랜드 뉘앙스를 조심해야 한다. 테마는 설명하되 공식 제휴처럼 보이면 안 된다.

### 남겨둔 이유

- Saitama Training은 재미와 habit design을 결합한 생활형 도구다.

### 내가 얻은 방식

- 게임화는 시각 테마보다 반복을 돕는 progression 구조가 중요하다.
- 운동 앱은 피드백과 조절이 있어야 한다.
- public copy는 팬메이드/비공식 뉘앙스를 조심해야 한다.

### 포트폴리오 각도

Saitama Training은 재미있는 테마를 실제 운동 지속 구조로 바꾼 프로젝트다. 보조 카드에서는 progressive overload와 RPE feedback을 중심으로 보여준다.

### 공개 가능 메모

- One Punch Training-inspired PWA.
- progressive overload, RPE, level-up, Firebase sync.
- GitHub Pages deployment.

### 비공개/수정 필요 메모

- 특정 IP/브랜드와 공식 관계처럼 보이는 표현은 피한다.

## English Machine Summary

Saitama Training is a secondary portfolio candidate about turning a playful
training theme into a real habit/progression system with RPE feedback,
progressive overload, and Firebase sync.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:25` | registry | high | Active Firebase project on GitHub Pages, port 5130. |
| `projects/saitama-training/CLAUDE.md:1-16` | project_doc | high | Defines stack, deployment, and live URL. |
| `projects/saitama-training/CLAUDE.md:48-99` | project_doc | high | Records progression components, Firebase sync, RPE feedback, and volume adjustment. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/saitama-training/CLAUDE.md
  - projects/saitama-training/docs/CHANGELOG.md
  - memory/diary
stale_when:
  - Training methodology changes.
  - Firebase sync or deployment model changes.
```
