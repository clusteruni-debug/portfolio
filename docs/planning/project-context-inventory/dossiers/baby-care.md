# Project Dossier: Baby Care

Status: draft
Public policy: public_candidate
Last checked: 2026-06-28
Language: Korean primary, English machine summary

## Identity

```yaml
slug: baby-care
display_name: Baby Care
registry_status: active
inventory_status: draft
public_policy: public_candidate
portfolio_priority: secondary_case
```

## 한국어 본문

### 왜 시작했나

- Baby Care는 수유, 수면, 기저귀, 건강, 성장, 예방접종, 일기를 빠르게 기록하기 위한 가족 단위 생활 도구다.
- 포트폴리오에서는 육아 기록 앱 자체보다, 바쁜 상황에서도 기록 부담을 줄이려는 설계가 중요하다.

### 당시의 개인적 맥락

- 육아 기록은 정확해야 하지만 입력이 느리면 유지되지 않는다.
- 가족 단위 공유, offline/PWA, quick action, repeat-last action은 실제 생활에서 필요한 장치다.

### 처음에 무엇을 착각했나

- 기록 항목이 많으면 충분해 보이지만, 실제로는 빠른 입력과 가족 단위 데이터 격리가 중요하다.
- 민감한 생활/아이 데이터는 security rules와 familyId 기반 접근이 핵심이다.

### AI와 어떻게 풀었나

- 사용자는 AI에게 큰 페이지를 기능별 component로 나누게 하면서도, 가족 데이터 격리와 Firebase rule을 계속 경계로 뒀다.
- AI는 입력 sheet, insight, form split 같은 반복 UI 구조화에 유용하게 쓰인 것으로 볼 수 있다.

### 중요한 선택

- family-level isolation을 세웠다.
  - 남긴 것: familyId 기반 접근.
  - 버린 것: 사용자 단위만 보는 단순 모델.
  - 이유: 육아 기록은 가족 공유가 핵심이다.

- PWA/offline을 남겼다.
  - 남긴 것: service worker, offline page.
  - 버린 것: 항상 온라인 전제.
  - 이유: 생활 기록은 순간 입력이 중요하다.

### 현재 상태

- Active.
- registry 기준 Next.js/Firebase/Vercel, port 3020.
- 보조 케이스로는 "민감한 생활 기록을 빠르게 남기는 가족 도구"로 다룬다.

### 폐기/보류 이유

- 폐기 상태는 아니다.
- 실제 가족/아이 데이터와 diary 내용은 공개하지 않는다.

### 남겨둔 이유

- Baby Care는 생활 맥락에서 AI가 반복 UI와 데이터 구조를 도울 수 있음을 보여준다.

### 내가 얻은 방식

- 기록 도구는 정확성보다 먼저 입력 지속성이 중요할 때가 많다.
- 가족 공유 데이터는 권한 모델이 핵심 기능이다.
- 민감한 도구는 공개 포트폴리오에서 문제/선택만 보여주고 내용은 숨긴다.

### 포트폴리오 각도

Baby Care는 가족 단위 생활 기록을 빠르게 남기기 위한 도구다. 공개 케이스로는 입력 부담, family isolation, PWA/offline 선택을 보여준다.

### 공개 가능 메모

- Family-based baby care record app.
- quick actions, repeat last action, PWA/offline.
- Firebase familyId security rules.

### 비공개/수정 필요 메모

- 실제 아이/가족 데이터, 기록 내용, 계정 정보는 공개하지 않는다.

## English Machine Summary

Baby Care is a secondary portfolio candidate about fast, family-scoped baby care
recording with Firebase, PWA/offline support, quick actions, and familyId
security rules.

## Evidence

| Source | Type | Confidence | Summary |
| --- | --- | --- | --- |
| `docs/project-registry.md:14` | registry | high | Active Vercel/Firebase project on port 3020. |
| `projects/baby-care/CLAUDE.md:1-4` | project_doc | high | Defines Baby Care stack. |
| `projects/baby-care/CLAUDE.md:60-89` | project_doc | high | Records quick actions, family context, Firestore modules, family isolation, PWA, and sharing. |

## Freshness

```yaml
last_checked: 2026-06-28
watch_sources:
  - config/projects.json
  - projects/baby-care/CLAUDE.md
  - memory/diary
stale_when:
  - Firebase security model changes.
  - Family-sharing or offline model changes.
```
