# Project Dossier: Mission Control

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: mission-control
display_name: Mission Control
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: main_case
```

## 한국어 본문

### 왜 시작했나

- Mission Control은 여러 프로젝트, 봇, plan, diary, runtime 상태를 한 화면에서 보려는 workspace cockpit이다.
- 사용자가 만든 프로젝트 수가 늘어나면서 "무엇이 살아 있고, 무엇이 stale이고, 어떤 AI 세션이 어디까지 했는가"를 사람이 기억하기 어려워졌다.
- 그래서 이 프로젝트는 단순 dashboard가 아니라, 작업 생태계 전체를 운영하기 위한 관제 표면이다.

### 당시의 개인적 맥락

- 사용자는 많은 프로젝트를 동시에 운영한다. 그 자체보다 더 큰 문제는 프로젝트 상태, 자동화, 기록, 검증, handoff가 흩어지는 것이다.
- diary, task board, plan, snapshot, PM2, bot status, GitHub, Supabase가 따로 놀면 AI 협업 품질도 떨어진다.
- Mission Control은 "프로젝트 관리 도구"가 아니라 "AI 협업과 개인 운영 체계의 공용 계기판"에 가깝다.

### 처음에 무엇을 착각했나

- dashboard는 데이터를 많이 보여주면 충분해 보인다. 실제로는 `reachable`과 `fresh`가 다르고, stale snapshot을 정상처럼 보여주면 더 위험하다.
- generated registry나 topology도 최신성이 검증되지 않으면 source of truth가 아니다.
- 여러 writer가 같은 JSONB/Supabase surface를 쓰면 schema contract가 없을 때 silent drop이 생길 수 있다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 Mission Control을 단순 UI 개선이 아니라 "현실과 표시값이 맞는지"를 계속 점검하게 했다.
- Codex는 read-heavy review와 cross-model review로, stale indicator, atlas, cron jobs, diary parser, doc-spec collector 같은 위험 표면을 검토했다.
- 사용자는 proof boundary를 강하게 요구했다. source proof, build proof, runtime proof, browser proof를 구분하게 했다.

### 중요한 선택

- registry를 generated source로 관리했다.
  - 남긴 것: `config/projects.json`와 enrichment source.
  - 버린 것: UI registry를 손으로 직접 고치는 방식.
  - 이유: 프로젝트가 많아질수록 수동 registry는 빠르게 stale해진다.

- snapshot writer contract를 문서화했다.
  - 남긴 것: shared payload type, typecheck, ADR.
  - 버린 것: 여러 writer가 암묵적으로 같은 shape을 쓰는 방식.
  - 이유: 관제 도구는 조용한 데이터 손실이 가장 위험하다.

- runtime과 generated knowledge의 freshness를 따로 보게 했다.
  - 남긴 것: dead-man's switch, stale indicator, profile-based doc scorecard.
  - 버린 것: 마지막 성공 값을 계속 정상으로 보는 방식.
  - 이유: 관제 화면은 실제 상태와 맞아야 한다.

### 현재 상태

- Active.
- registry상 Next.js/Tailwind/Supabase, Vercel deploy, port 3000 프로젝트다.
- API, dashboard, agent queue, project detail, snapshot, diary, harness, process monitoring 등 workspace cockpit 역할을 한다.
- 포트폴리오에서는 "AI로 프로젝트를 많이 만든 뒤, 그 운영 자체를 제품화한 사례"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- public page에는 내부 runtime, secrets, local bot 상태, raw diary detail을 그대로 노출하면 안 된다.

### 남겨둔 이유

- Mission Control은 전체 작업 방식의 backbone이다.
- AX 시대의 개인 작업 포트폴리오에서 "결과물"뿐 아니라 "운영 체계"를 보여주는 핵심 사례다.

### 내가 얻은 방식

- dashboard는 예쁜 요약이 아니라 stale을 드러내는 장치여야 한다.
- AI 협업이 늘수록 handoff, proof, task state, source-of-truth를 강제로 구조화해야 한다.
- 자동화가 많아질수록 dead-man's switch와 freshness가 필요하다.

### 포트폴리오 각도

Mission Control은 여러 앱을 만든 뒤 생긴 운영 문제를 다시 하나의 제품으로 만든 사례다. AI 협업의 결과를 관리하기 위해 AI 세션, 계획, 검증, runtime 상태를 한 화면으로 모은 cockpit이다.

### 공개 가능 메모

- 다중 프로젝트/봇/계획/diary를 다루는 workspace cockpit.
- source proof와 runtime proof를 구분하는 운영 철학.
- stale 상태를 숨기지 않고 드러내는 dashboard.

### 비공개/수정 필요 메모

- Supabase table, service-role, local service URL, bot status detail은 공개 문구에서 제거한다.
- 내부 diary/raw task detail은 public case에서는 추상화한다.

## English Machine Summary

Mission Control is a main portfolio candidate about operating the user's whole
AI-assisted project ecosystem. It turns projects, bots, plans, diary entries,
snapshots, queues, and runtime health into a cockpit with strong source-of-truth,
freshness, and proof-boundary concerns.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:9-10` | registry | high | Mission Control and its snapshot daemon are active. |
| `projects/mission-control/CLAUDE.md:3-14` | project_doc | high | Defines Next.js stack, run commands, and Vercel deploy. |
| `projects/mission-control/CLAUDE.md:20-44` | project_doc | high | Records dashboard, APIs, agent queue, project detail, and monitoring structure. |
| `projects/mission-control/CLAUDE.md:63-75` | project_doc | high | Records registry source-of-truth, snapshot writers, and Vercel/runtime boundaries. |
| `MEMORY.md:310-396`, `MEMORY.md:702-917`, `MEMORY.md:1340-1406` | raw_codex_log_summary | medium | Prior memory covers cost ledger, atlas, dashboard, doc-spec collector, eval harness, and stale/freshness review surfaces. |
| `memory/diary/2026-06-26.md` | diary | medium | Diary entries record drift/stale fixes, harness visualization, runtime-agent scorecards, and dead-man's-switch lessons. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/mission-control/CLAUDE.md
  - projects/mission-control/src/data/mc-enrichment.json
  - docs/architecture/workspace-entities.md
  - memory/diary
stale_when:
  - Registry generation changes.
  - Snapshot/collector contracts change.
  - Dashboard tabs or runtime proof model changes.
```
