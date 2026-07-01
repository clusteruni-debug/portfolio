# Project Dossier: AI Hub

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: ai-hub
display_name: AI Hub + AI Hub Extension
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- AI Hub는 여러 AI 서비스를 한 Electron 앱 안에서 다루고, 대화 기록과 사용 흔적을 다시 분석 가능한 개인 아카이브로 만들려는 프로젝트다.
- 단순히 ChatGPT, Claude, Gemini 탭을 모아두는 것이 아니라, AI 사용 자체를 다시 데이터로 만드는 방향이다.
- 포트폴리오에서는 "AI를 쓰는 도구"가 아니라 "내 AI 사용을 관찰하고 축적하는 도구"로 다루는 것이 맞다.

### 당시의 개인적 맥락

- 사용자는 여러 AI 서비스 사이를 오가며 대화, 결과, 프롬프트, 분석을 흩어뜨리고 있었다.
- 대화가 흩어지면 나중에 무엇을 어떻게 물었고 어떤 방식이 잘 통했는지 다시 보기 어렵다.
- AI Hub는 이 분산을 줄이고, AI 사용 습관 자체를 분석 대상으로 만들려는 시도다.

### 처음에 무엇을 착각했나

- 여러 서비스를 한 창에 띄우면 해결될 것처럼 보이지만, 실제 문제는 세션 유지, 메모리, import/export, 분석 schema, Supabase 저장까지 이어진다.
- Electron WebContentsView는 iframe처럼 단순히 붙이는 것이 아니라 CSP/세션/메모리 lifecycle을 관리해야 한다.
- 대화 수집은 "저장"만으로 끝나지 않는다. 보고서 schema와 분석 섹션이 있어야 다시 쓸 수 있다.

### AI와 어떻게 풀었나

- 사용자는 AI Hub를 통해 AI 사용 경험 자체를 도구화했다. 다시 말해 AI와의 대화가 다음 AI 사용을 개선하는 데이터가 되게 하려 했다.
- import parser, conversation list, report schema, lazy loading 같은 구조를 나눠서 AI에게 정리/검토하게 했다.
- "무엇을 저장할 것인가"와 "나중에 어떻게 분석할 것인가"를 동시에 잡은 것이 중요하다.

### 중요한 선택

- Electron WebContentsView 기반으로 갔다.
  - 남긴 것: 각 AI 서비스의 실제 웹 세션과 로그인 상태.
  - 버린 것: API-only wrapper.
  - 이유: 사용자는 실제 서비스를 쓰면서 흐름을 모으고 싶었다.

- lazy loading을 도입했다.
  - 남긴 것: inactive tab destroy/recreate, partition persistence.
  - 버린 것: 모든 서비스를 계속 켜두는 방식.
  - 이유: 여러 AI 웹뷰는 메모리와 crash risk가 크다.

- analysis report schema를 만들었다.
  - 남긴 것: prompt style, AI comparison, topic distribution, efficiency, growth, profile.
  - 버린 것: 대화 목록만 저장하는 방식.
  - 이유: 포트폴리오 관점에서는 AI 사용 방식 자체가 결과물이다.

### 현재 상태

- Active.
- registry 기준 AI Hub는 local Electron/Supabase app이고, AI Hub Extension은 Chrome extension/Supabase app이다.
- 포트폴리오에서는 둘을 하나의 "AI usage archive and analysis" 케이스로 묶어 다루는 것이 적절하다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 보류되는 부분은 실제 raw conversation 공개다. 대화 내용은 민감할 수 있으므로 public page에는 구조와 목적만 보여준다.

### 남겨둔 이유

- AI Hub는 AX 시대 포트폴리오의 메타 프로젝트다.
- 사용자가 AI를 많이 썼다는 사실보다, 그 사용을 기록/분석 가능한 대상으로 만들려 했다는 점이 강하다.

### 내가 얻은 방식

- AI 사용은 결과물만 남기면 재학습이 어렵다.
- 여러 AI 서비스의 차이는 체감으로만 말하지 말고 데이터/리포트 구조로 남겨야 한다.
- 세션, 메모리, import/export 같은 지루한 운영 문제가 실제 사용성을 결정한다.

### 포트폴리오 각도

AI Hub는 AI를 사용하는 앱이면서 동시에 AI 사용을 다시 분석하는 앱이다. 사용자는 AI와의 대화 자체를 개인 지식/작업 방식의 데이터로 보존하려 했다.

### 공개 가능 메모

- 여러 AI 서비스를 한 앱에서 다루는 Electron tool.
- 대화 import/export와 analysis report schema.
- AI 사용 습관을 데이터로 보는 메타 프로젝트.

### 비공개/수정 필요 메모

- 실제 대화 내용, account/session detail, 서비스별 로그인 상태는 공개하지 않는다.
- 각 AI 서비스 약관/자동화 경계는 공개 전 별도 확인 필요.

## English Machine Summary

AI Hub is a main portfolio candidate about turning the user's AI usage into a
manageable and analyzable archive. It combines multiple AI service sessions,
conversation import/export, Supabase-backed records, lazy WebContentsView
lifecycle management, and report schemas.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:28-29` | registry | high | AI Hub and AI Hub Extension are active, Supabase-backed projects. |
| `projects/ai-hub/CLAUDE.md:4-6` | project_doc | high | Defines the purpose, stack, and WebContentsView architecture. |
| `projects/ai-hub/CLAUDE.md:23-43` | project_doc | high | Records lazy loading and panel lifecycle model. |
| `projects/ai-hub/CLAUDE.md:78-106` | project_doc | high | Defines export/import and analysis report schema structure. |
| `projects/ai-hub/CLAUDE.md:124-143` | project_doc | high | Records Supabase, WebContentsView, CSP, and lazy-loading cautions. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - docs/project-registry.md
  - projects/ai-hub/CLAUDE.md
  - projects/ai-hub-extension
  - memory/diary
stale_when:
  - Extension/public distribution status changes.
  - Report schema or storage model changes.
  - Conversation ingestion policy changes.
```
