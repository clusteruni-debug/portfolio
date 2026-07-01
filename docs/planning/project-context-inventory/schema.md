# Project Context Inventory Schema

Status: draft
Owner: portfolio
Purpose: internal planning source for human-centered portfolio case studies

## Purpose

This inventory records why each project existed, what the user believed at the time,
how the user used AI as a thinking and execution tool, what decisions were made,
and why the project is active, paused, preserved, or retired.

It is not a public article draft. It is the evidence layer that the user can later
edit into public portfolio copy.

## Non-Goals

- Do not auto-publish to the portfolio site.
- Do not write to Supabase or CMS.
- Do not turn AI work logs into the main story.
- Do not expose private diary lines, internal paths, secrets, or operational notes
  on public pages without manual rewriting.
- Do not change project registry status.

## Inventory Record

```yaml
slug:
display_name:
registry_status: active | archived | external | infrastructure
inventory_status: draft | reviewed | approved | stale
public_policy: internal_only | public_candidate | approved_public

why_started:
personal_context:
initial_assumptions:

ai_interaction:
  user_questions:
  rejected_answers:
  criteria_set_by_user:
  useful_prompt_patterns:
  source_user_language:
  evidence_refs:

important_decisions:
  - decision:
    kept:
    rejected:
    reason:
    evidence_refs:

current_state:
paused_or_retired_reason:
kept_because:
what_i_learned:
portfolio_angle:

public_safe_notes:
redaction_notes:

evidence:
  - evidence_id:
    source_path:
    source_type: diary | plan | board | project_doc | postmortem | registry | review | raw_claude_jsonl | raw_codex_log | hermes_note
    source_role: user_turn | assistant_turn | session_summary | project_fact | verification_trace
    signal_type: why | assumption | correction | rejection | decision | status | retention | lesson | publication_boundary
    section_targets:
      - why_started
      - ai_interaction
    safe_excerpt_ko:
    paraphrase_ko:
    evidence_summary:
    privacy: internal | public_rewrite_required | public_safe
    confidence: high | medium | low

freshness:
  last_checked:
  watch_sources:
  stale_when:
```

## Dossier Language Contract

The schema and automation documents are English. Dossier content is bilingual:

- Korean primary body for user review.
- English machine summary for AI review and future automation.
- Structured YAML and evidence tables may keep English keys.

This is an intentional exception to the default shared-doc language rule because
the dossier reader is the user, not only an AI operator.

Do not add a standalone "actual user utterances" section by default. The user's
language should shape the existing sections through claim-level evidence links.
Short internal excerpts may appear in the evidence table only when they clarify
the user's intent, boundary, or decision style.

## Claim-Level Evidence Model

Each meaningful dossier claim should be traceable to one or more evidence items.
This is especially important for human-centered fields:

- Why the user started the project.
- What the user initially assumed.
- How the user redirected, constrained, or rejected AI output.
- Which options the user kept, rejected, or deferred.
- Why the current status is appropriate.

Raw Claude Code JSONL, Codex raw session logs, and diary notes are not a side
appendix for these fields. They are primary evidence for the user's intent and
decision style. Project docs and registries remain primary evidence for current
operational facts.

Recommended internal shape:

```yaml
claim:
  section: ai_interaction
  text_ko:
  evidence_refs:
    - my1rm-raw-20260608-public-tool
    - my1rm-diary-20260608-privacy-opt-in
  confidence: high
```

## Field Rules

| Field | Rule |
| --- | --- |
| `why_started` | The human reason for starting the project. Avoid "built an app that..." summaries. |
| `personal_context` | The recurring discomfort, pressure, curiosity, or working habit behind the project. |
| `initial_assumptions` | What seemed true at the start but later changed. |
| `ai_interaction` | Record how the user questioned, corrected, rejected, constrained, or redirected AI. |
| `important_decisions` | Include what was deliberately not done. Non-decisions are often the portfolio signal. |
| `current_state` | State plus reason. "Active" or "archived" alone is not enough. |
| `paused_or_retired_reason` | Use when status is paused or archived. This should explain the stopping rule. |
| `kept_because` | Why the project remains useful as code, evidence, or learning even if not operated. |
| `what_i_learned` | The user's method: problem framing, verification habits, privacy boundary, public/private judgment, product sense. |
| `portfolio_angle` | The future case-study thesis, not final public copy. |
| `public_safe_notes` | Facts that can likely become public after rewriting. |
| `redaction_notes` | Private details, internal paths, sensitive logs, or unresolved claims to remove before publication. |

## Evidence Confidence

| Confidence | Meaning |
| --- | --- |
| high | Confirmed by direct source evidence for that field. For user intent, this means raw user turns or diary. For status, this means registry or project docs. |
| medium | Supported by multiple indirect traces but missing a direct source or final runtime proof. |
| low | Plausible context only. Must not be used in public copy without another source. |

## Status Semantics

| Status | Meaning |
| --- | --- |
| `draft` | Raw internal inventory. Not reviewed by the user. |
| `reviewed` | User has checked factual direction but public copy is not approved. |
| `approved` | The internal record is stable enough to feed a public case-study draft. |
| `stale` | A watched source changed after `last_checked`, or evidence conflicts with newer docs. |

## Public Policy

| Policy | Meaning |
| --- | --- |
| `internal_only` | Keep out of the public portfolio. Useful for private memory only. |
| `public_candidate` | May become public after manual editing and redaction. |
| `approved_public` | Safe to use as source material for CMS/site content. Still no automatic publish. |

## Done Criteria For A Dossier

- It names the project status and why that status is right.
- It captures the user's reason for starting the project.
- It records at least one initial assumption that changed.
- It records how the user directed AI, not just what AI produced.
- It lists decisions kept, rejected, or deferred.
- It includes evidence paths with confidence.
- It separates internal notes from public-safe notes.
