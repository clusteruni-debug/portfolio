# Project Context Inventory Automation Design

Status: draft
Owner: portfolio
Scope: read-only collection and stale detection, not publishing

## Goal

Make project-context inventories easier to refresh without turning the system
into an auto-publisher. Automation should collect evidence candidates, detect
stale records, and produce reviewable drafts. The user remains the publisher.

## Pipeline

### Stage 0: Manual Dossier Seed

Create the schema and three hand-curated dossiers:

- `dossiers/portfolio.md`
- `dossiers/my1rm.md`
- `dossiers/tradinglab.md`

This stage proves whether the fields are useful before building scripts. The
first three dossiers are also quality pilots, but their long-term home is
`dossiers/`.

### Stage 1: User-Language Evidence Collector

Candidate script:

```text
scripts/collect-project-context-inventory.py
```

Default mode:

```text
python -X utf8 scripts/collect-project-context-inventory.py --project portfolio --dry-run
```

Responsibilities:

- Read `config/projects.json` for slug, status, path, and verification command.
- Collect raw human-facing conversation evidence before summarizing:
  - Claude Code JSONL user turns for the target project.
  - Codex raw session logs and rollout summaries for the target project.
  - diary entries that record the user's decision, blocker, or correction.
  - Hermes daily source notes only as a lookup accelerator, not as a replacement
    for raw turns when raw turns are available.
- Read project-local docs when present:
  - `CLAUDE.md`
  - `AGENTS.md`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/*.md`
  - `agent_docs/*.md`
- Search bounded workspace evidence:
  - `memory/diary/YYYY-MM-DD.md`
  - `AGENT_TASK_BOARD.md`
  - `docs/plans/PLAN-*.md`
  - `archive/plans-completed/*.md`
  - `docs/postmortems/*.md`
  - `memory/qa/`
  - `memory/codex-session/`
  - `memory/reviews/`
- Emit evidence candidates with source path, line hint, source role, signal type,
  safe excerpt, paraphrase, section targets, and confidence.
- Link each dossier claim to one or more evidence IDs instead of writing a
  generic project summary.

Non-responsibilities:

- No Supabase writes.
- No CMS writes.
- No public file generation.
- No status mutation in `config/projects.json`.
- No diary rewriting.

### Stage 2: Stale Detector

Candidate command:

```text
python -X utf8 scripts/collect-project-context-inventory.py --check
```

Rules:

- A dossier becomes `stale` when a watched source has a newer modified time than
  the dossier `freshness.last_checked`.
- A dossier becomes `needs_review` when evidence conflicts with registry status.
- A dossier becomes `low_confidence` when it lacks direct diary, plan, or project
  documentation evidence.

Output should be a report, not an edit, unless `--write-draft` is explicitly set.

### Stage 3: Draft Writer

Candidate command:

```text
python -X utf8 scripts/collect-project-context-inventory.py --project my1rm --write-draft
```

Allowed output:

```text
projects/portfolio/docs/planning/project-context-inventory/dossiers/<slug>.draft.md
```

The writer may fill source evidence tables and blank schema fields, but it must
not mark anything `approved` or `approved_public`.

### Stage 4: Public Export Candidate

This is intentionally deferred. If needed later, it should create a private
export file for review, not publish directly:

```text
projects/portfolio/docs/planning/project-context-inventory/public-candidates/<slug>.md
```

No automatic CMS insertion. No Vercel-triggering content change without manual
approval.

## Source Priority

Source priority depends on the field being filled. User-centered fields must be
rebuilt from user language first. Operational fields still come from project
source-of-truth files.

### User-Centered Fields

| Priority | Source | Use |
| --- | --- | --- |
| 1 | Raw Claude Code JSONL / Codex raw logs, user turns only | The user's actual intent, phrasing, rejection, correction, and constraints. |
| 2 | `memory/diary/YYYY-MM-DD.md` | Session-level rationale, outcomes, blockers, and retrospective framing. |
| 3 | Codex rollout summaries / Claude sidecars / review logs | Condensed trace of prompts, verification limits, and model-bias checks. |
| 4 | `docs/plans/`, `archive/plans-completed/`, `docs/postmortems/` | Formalized decisions and stopping rules. |
| 5 | `AGENT_TASK_BOARD.md` | Task state and handoff trace. |

### Operational Fields

| Priority | Source | Use |
| --- | --- | --- |
| 1 | `config/projects.json` | Registry status and canonical project path. |
| 2 | Project `CLAUDE.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md` | Current project identity and operation facts. |
| 3 | Source code, deployment config, verification docs | Runtime shape and current constraints. |
| 4 | Diary and task board | Recent status changes, verification, and known gaps. |

## Extraction Signals

The collector should classify evidence before writing a dossier draft:

| Signal | Examples |
| --- | --- |
| `why` | "I want a public tool", "I need this for maintenance", "I keep repeating this task". |
| `assumption` | "This should be simple", "data will answer it", "automation should solve it". |
| `correction` | "Not that direction", "look at why it feels empty first", "keep this exact behavior". |
| `rejection` | "Do not write", "do not auto-publish", "no DB", "no tracking". |
| `decision` | "Use opt-in", "make it a separate project", "preserve rank API". |
| `status` | Active, paused, retired, blocked, or user-verification pending with reason. |
| `lesson` | Product judgment, verification habit, privacy boundary, public/private split. |

## Safety Constraints

- The public story must stay human-centered.
- Raw logs should drive the internal dossier, but public copy must be rewritten.
- Internal paths may remain in internal evidence tables but must be removed from
  public text.
- Private diary wording should be rewritten before publication.
- Evidence gaps must be marked directly instead of papered over.
- Generated workspace views can be used for discovery, but source files win when
  there is a conflict.

## Suggested Output Shape

```yaml
project: my1rm
status: active
evidence_count: 12
confidence: high
stale: false
needs_user_review: true
public_policy: public_candidate
blocked_publication_reasons:
  - "Public copy has not been manually rewritten."
  - "Internal evidence paths remain in the draft."
```

## Verification Plan For Future Script

- `python -m py_compile scripts/collect-project-context-inventory.py`
- Dry-run for the three seed projects.
- Check mode returns non-zero only on schema or stale-state errors.
- No writes unless `--write-draft` is present.
- `git diff --check` after generated drafts.
- Portfolio `npm run build` is only required if site code or CMS-bound content
  changes later.
