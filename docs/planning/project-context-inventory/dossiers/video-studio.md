# Project Dossier: Video Studio

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: video-studio
display_name: Video Studio
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- Video Studio는 AI로 영상을 자동 생성하려는 도구지만, 핵심은 "공짜/로컬/검수 가능"이라는 운영 기준을 지키는 데 있다.
- 사용자는 Shorts 제작처럼 반복적인 콘텐츠 제작 흐름을 자동화하고 싶었지만, 무조건 API 비용을 쓰거나 결과를 자동 게시하는 방향은 원하지 않았다.
- 그래서 이 프로젝트는 생성 자동화보다, source review, provider policy, local bridge, render proof를 묶는 제작 파이프라인으로 보는 것이 맞다.

### 당시의 개인적 맥락

- 영상 제작은 기획, 소스, 이미지/영상, TTS, BGM, 자막, 렌더가 모두 얽힌다.
- 사용자는 "결과물이 나왔다"보다 "이 소스가 쓸 만한가", "무료 provider로 가능한가", "렌더가 실제로 안전한가"를 더 중요하게 봤다.
- 비용과 자동 게시 위험을 낮추면서도, 사람이 검수할 수 있는 제작 표면이 필요했다.

### 처음에 무엇을 착각했나

- 처음엔 provider를 많이 붙이면 자동화가 완성될 것처럼 보일 수 있다. 하지만 프로젝트는 오히려 paid provider 차단, Sora 2 retirement, zero-paid routing 같은 제한이 중요해졌다.
- source-level build나 render script만으로 최종 영상 품질이 보장되지는 않는다.
- 브라우저/폰에서 실제 결과를 보고 accepted-source를 고르는 과정이 빠지면 자동 생성물은 쉽게 쓰레기가 된다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 "만들어"만 시키지 않고, 한국/해외 레퍼런스, accepted source, render grammar, subtitle layout, local dashboard gate를 계속 검토하게 했다.
- Codex review와 browser-control proof rail이 반복적으로 등장했다. 특히 signed-in Chrome, result visible, `/c/*` redirect 같은 proof boundary가 중요했다.
- 영상 생성은 runtime proof가 없으면 완료 claim을 닫지 않는 방식으로 운영됐다.

### 중요한 선택

- zero-paid provider policy를 세웠다.
  - 남긴 것: Gemini/Pexels/Klipy/Edge TTS/local BGM 등 무료 또는 로컬 우선 경로.
  - 버린 것: paid provider를 기본 경로로 쓰는 방식.
  - 이유: 반복 제작 도구는 비용 폭주를 막아야 한다.

- 자동 발행보다 accepted-source review를 우선했다.
  - 남긴 것: 사람이 소스를 보고 고르는 구조.
  - 버린 것: 생성 즉시 publish되는 구조.
  - 이유: 영상은 공개 품질과 저작권/출처 리스크가 크다.

- rendering spec을 문서화했다.
  - 남긴 것: safe zone, subtitle position, BGM ducking, background priority.
  - 버린 것: 매번 감으로 자막/렌더를 조정하는 방식.
  - 이유: 반복 제작에서는 감각을 규격으로 바꿔야 한다.

### 현재 상태

- Active.
- registry 기준 Windows local tool, port 5160, DB 없음.
- project doc 기준 React/Vite UI, Python bridge, FFmpeg composition, provider adapters, zero-paid policy가 있다.
- 포트폴리오에서는 "자동 생성보다 검수 가능한 제작 pipeline을 만든 사례"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류되는 부분은 공개 가능한 결과물 claim이다. 실제 영상 산출물, phone review, accepted-source review가 있어야 공개 문장에서 품질을 말할 수 있다.

### 남겨둔 이유

- Video Studio는 AI 시대 콘텐츠 제작에서 "자동화 경계"를 가장 잘 보여주는 프로젝트다.
- 비용, provider, 소스 검수, 렌더 검증, 공개 판단이 모두 들어 있다.

### 내가 얻은 방식

- 생성 파이프라인은 provider 수보다 proof boundary가 중요하다.
- 무료/로컬 우선 정책은 기능 제한이 아니라 운영 리스크를 낮추는 선택이다.
- 영상은 스크립트 통과보다 실제 화면과 최종 파일을 봐야 한다.

### 포트폴리오 각도

Video Studio는 AI 영상 자동화 도구이지만, 포트폴리오에서는 "자동 생성물을 곧바로 믿지 않고, 비용과 공개 품질을 통제하는 제작 시스템"으로 다루는 것이 맞다.

### 공개 가능 메모

- zero-paid provider policy.
- local Python bridge + React UI + FFmpeg render.
- accepted-source review와 render proof 중심의 workflow.

### 비공개/수정 필요 메모

- provider API key, internal browser-control logs, raw source URLs는 공개하지 않는다.
- 특정 외부 서비스의 최신 모델/가격/정책은 공개 전 재확인 필요.

## English Machine Summary

Video Studio is a main portfolio candidate about making AI-assisted video
production inspectable and cost-controlled. The user chose zero-paid/local-first
provider routing, accepted-source review, render specs, and runtime proof over
automatic publishing.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:43` | registry | high | Video Studio is active, local, Windows runtime on port 5160. |
| `projects/video-studio/CLAUDE.md:3-11` | project_doc | high | Defines the tool, provider pipeline, zero-paid policy, and Windows-first model. |
| `projects/video-studio/CLAUDE.md:41-68` | project_doc | high | Records provider policy, adapters, local BGM, and usage tracking. |
| `projects/video-studio/CLAUDE.md:85-86` | project_doc | high | Records Sora 2 retirement and deferred cleanup. |
| `projects/video-studio/CLAUDE.md:105-123` | project_doc | high | Defines local run flow and mandatory rendering rules. |
| `MEMORY.md:675-685` | raw_codex_log_summary | medium | Prior memory records browser-control proof rail and signed-in Chrome proof boundaries. |
| `memory/diary/2026-06-15.md`, `memory/diary/2026-06-26.md` | diary | medium | Diary entries record reference, render, dashboard gate, and build recovery sessions. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - docs/project-registry.md
  - projects/video-studio/CLAUDE.md
  - projects/video-studio/docs/RENDERING-SPEC.md
  - memory/diary
stale_when:
  - Provider policy changes.
  - A published/accepted video workflow lands.
  - Tauri or remote dashboard status changes.
```
