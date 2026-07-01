# Project Dossier: Navigator

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: navigator
display_name: Navigator
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- Navigator는 단순 할 일 앱이 아니라, 실행력이 떨어지는 날에도 다음 행동을 덜 고민하게 만들기 위한 작업 관리 도구다.
- 프로젝트 문서의 첫 문장은 `ADHD-Friendly Task Management`다. 포트폴리오에서는 이 표현을 그대로 전면에 내세우기보다, "판단 비용을 줄이는 개인 실행 시스템"으로 풀어야 한다.
- 사용자의 필요는 많은 일을 기록하는 것이 아니라, 해야 할 일을 잊지 않고 다시 잡아올 수 있는 구조였다.

### 당시의 개인적 맥락

- localStorage와 Firebase를 같이 쓰는 구조는 "로그인/동기화가 끊겨도 개인 실행 흐름이 깨지지 않게" 하려는 방향과 맞닿아 있다.
- 반복 작업, 완료/보관, 알림, 이벤트 deep link 같은 기능은 생산성 앱의 장식이 아니라 실제 생활 루틴과 연결되는 부분이다.
- 프로젝트가 오래 살아남은 이유는 멋진 UI보다, 사용자의 반복되는 실행 문제를 직접 건드렸기 때문이다.

### 처음에 무엇을 착각했나

- task manager는 기능을 많이 넣으면 좋아질 것처럼 보이지만, 실제 문제는 "지금 뭘 해야 하는지"를 덜 생각하게 만드는 것이다.
- 동기화 기능은 편의 기능처럼 보이지만, Navigator에서는 데이터 손실과 ping-pong을 막는 핵심 운영 문제였다.
- GitHub Pages 배포가 workspace push와 자동으로 이어진다고 생각하면 live 페이지가 오래 stale해질 수 있다는 교훈도 남아 있다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 단순 기능 추가보다 sync, merge, legacy 데이터, 완료 lifecycle 같은 실패 지점을 계속 점검하게 했다.
- Codex/Cross-model review가 반복적으로 사용된 프로젝트다. 특히 Firebase merge, legacy shape, completion log, PWA reminder 같은 영역은 "될 것 같다"가 아니라 회귀 가능성을 추적하는 방식으로 다뤘다.
- 사용자는 숫자나 live 데이터가 없을 때는 fabricated measurement를 허용하지 않는 방향을 세웠다.

### 중요한 선택

- Vanilla JS 구조를 유지했다.
  - 남긴 것: sequential script loading, 전역 handler registry, 직접 제어 가능한 HTML/JS 구조.
  - 버린 것: 무조건적인 프레임워크 전환.
  - 이유: 기존 데이터와 UI가 얽힌 상태에서 대규모 재작성보다 안정적 진화가 중요했다.

- Firebase와 localStorage를 함께 유지했다.
  - 남긴 것: 로그인 전/offline 로컬 사용성과 로그인 후 cross-device sync.
  - 버린 것: 단일 저장소만 바라보는 단순 모델.
  - 이유: 사용 흐름이 끊기면 task manager의 가치가 떨어진다.

- 배포 동기화 절차를 명시했다.
  - 남긴 것: `sync-navigator-deploy.sh`와 service-worker refresh 절차.
  - 버린 것: workspace commit만으로 live가 최신일 것이라는 가정.
  - 이유: 실제 사용 페이지가 stale하면 내부 구현 완료와 사용자 경험이 갈라진다.

### 현재 상태

- Active.
- registry 기준 GitHub Pages 배포, Firebase, port 5000 프로젝트다.
- 기능 표면은 task CRUD, recurring reset, Firebase sync, PWA reminder, event deep link까지 확장되어 있다.
- 포트폴리오에서는 "개인 실행력을 보조하는 시스템을 만들고, sync와 배포까지 검증한 사례"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류되는 부분은 공개 문장에 너무 많은 내부 sync 세부를 넣는 것이다. public page에서는 실행 문제와 선택 기준만 보여주는 것이 좋다.

### 남겨둔 이유

- Navigator는 사용자가 실제로 오래 개선해 온 생활형 도구다.
- AI를 구현 보조보다 "회귀를 의심하고 데이터 모양을 지키는 리뷰어"로 쓴 흔적이 강하다.

### 내가 얻은 방식

- 실행 도구는 기능 목록보다 실패하는 날의 friction을 줄여야 한다.
- sync-heavy 앱에서는 legacy 데이터와 배포 stale이 실제 제품 품질을 결정한다.
- AI에게 "기능을 추가하라"보다 "깨질 수 있는 경계를 먼저 찾으라"고 시키는 방식이 유효했다.

### 포트폴리오 각도

Navigator는 사용자의 실행 문제를 task manager라는 익숙한 형태로 다시 만든 프로젝트다. 핵심은 할 일을 예쁘게 나열한 것이 아니라, 반복, 완료, 동기화, 알림, 배포 stale까지 포함해 "내가 다시 움직이게 하는 구조"를 만든 점이다.

### 공개 가능 메모

- ADHD-friendly task management를 "판단 비용을 줄이는 실행 시스템"으로 재작성.
- local-first와 sync를 함께 다룬 개인 도구.
- stale deploy와 legacy data 같은 실제 운영 문제를 포트폴리오의 선택 사례로 사용 가능.

### 비공개/수정 필요 메모

- Firebase schema, anon key, internal deploy script detail은 공개 문구에서 최소화한다.
- diary/log evidence는 원문 노출 없이 요약만 사용한다.

## English Machine Summary

Navigator is a main portfolio candidate about reducing execution friction, not
just managing tasks. The user used AI heavily as a reviewer for sync, lifecycle,
legacy data, deployment staleness, and PWA reminder risks.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:17` | registry | high | Navigator is active, uses GitHub Pages and Firebase. |
| `projects/navigator/CLAUDE.md:1-4` | project_doc | high | Defines the project as ADHD-friendly task management on HTML/Vanilla JS/Firebase. |
| `projects/navigator/CLAUDE.md:12-18` | project_doc | high | Deployment is a separate standalone repo flow; workspace push is not enough. |
| `projects/navigator/CLAUDE.md:27-42` | project_doc | high | Records localStorage/Firebase dual storage, sync prevention, XSS, and integration constraints. |
| `MEMORY.md:273-299`, `MEMORY.md:928-1023` | raw_codex_log_summary | medium | Prior Codex memories cover merge, completion log, PWA, entries migration, and credential-blocked measurement boundaries. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - docs/project-registry.md
  - projects/navigator/CLAUDE.md
  - projects/navigator/README.md
  - memory/diary
stale_when:
  - Live deploy flow changes.
  - Firebase/localStorage model changes.
  - Navigator is folded into another daily workflow.
```
