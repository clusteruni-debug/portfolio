# Project Context Inventory Publication Rules

Status: draft
Owner: portfolio

## Principle

The inventory is private evidence. The portfolio site is public storytelling.
The system may help collect and organize facts, but publication is always a
manual decision.

## Allowed Flow

```text
internal inventory
  -> user factual review
  -> public candidate draft
  -> user rewrite/redaction
  -> manual CMS or site update
```

Disallowed flow:

```text
logs or diary
  -> automatic public article
```

## Human-Centered Framing

Use this framing:

- Why I started it.
- What I misunderstood at first.
- How I used AI to test, reject, narrow, or execute.
- What I chose not to do.
- Why the current state is right.
- What method I gained.

Avoid this framing:

- Which model wrote the code.
- Which tool fixed which file.
- A long operational transcript.
- A public explanation of private workspace mechanics.
- A claim that a project "failed" without the stopping criterion.

## Public-Safe Content

Usually safe after rewriting:

- Project purpose.
- Active, paused, or archived state.
- Product decisions.
- Verification standards.
- What was intentionally kept simple.
- Why a project was stopped.
- Lessons about problem framing and AI usage.

Review before public use:

- Diary language.
- Internal file paths.
- User-specific personal context.
- Metrics that imply financial, legal, medical, or private claims.
- Private deployment or credential details.
- Unverified runtime claims.

Never publish directly:

- Secrets or `.env` values.
- Private logs.
- Raw AI transcripts.
- Internal task board rows copied verbatim.
- Security-sensitive implementation details.
- Personal details unrelated to the portfolio thesis.

## Public Policy Labels

| Label | Publication Rule |
| --- | --- |
| `internal_only` | Keep as private reference. |
| `public_candidate` | May be rewritten into public copy after review. |
| `approved_public` | Approved source material, still manually published. |

## Writing Standard

The public page should not sound like a generated case study. The inventory
should therefore keep facts in short blocks instead of over-polished paragraphs.

Useful public copy can be written later from:

- concrete starting pressure
- concrete rejected direction
- concrete decision
- concrete current status
- concrete lesson

## Portfolio CMS Gate

Portfolio CMS tags such as `portfolio:story:{slug}` are a later integration
target only. A project inventory file does not imply:

- CMS insertion
- `portfolio:featured`
- Vercel deployment
- public release

## Approval Checklist

Before any inventory becomes public copy:

- The user has reviewed factual direction.
- Private evidence paths are removed or rewritten.
- AI-tool implementation details are not the main story.
- Status and stopping reason match `config/projects.json` and project docs.
- Any high-stakes claim has direct evidence or is removed.
- The final copy has a clear human reason for existing.
