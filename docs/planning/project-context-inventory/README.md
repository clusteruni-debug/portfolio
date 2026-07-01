# Project Context Inventory

Status: draft
Owner: portfolio

## Purpose

This folder holds internal source material for portfolio case studies. It turns
project docs, diary evidence, plans, postmortems, task traces, and raw AI-session
user turns into human-centered project dossiers.

The dossiers are not public articles. They are structured editing material for
the user.

## Language Contract

- `schema.md`, `automation-design.md`, and `publication-rules.md` stay in English
  because they are operator and automation documents.
- `dossiers/*.md` use Korean as the primary review language because the user is
  the direct reader and editor.
- `dossiers/*.md` also include an English machine summary and structured
  evidence table so AI review, automation, and cross-project quality checks can
  work without translating the whole file first.
- `public-candidates/*.md` should default to Korean unless the user requests
  another publication language.

## Folder Structure

```text
project-context-inventory/
  README.md
  schema.md
  automation-design.md
  publication-rules.md
  dossiers/
    <slug>.md
  public-candidates/
    README.md
```

## Folder Roles

| Path | Role |
| --- | --- |
| `schema.md` | Field definitions and evidence rules for all dossiers. |
| `automation-design.md` | Read-only collection, stale detection, and future draft generation design. |
| `publication-rules.md` | Public/private boundary and manual approval rules. |
| `dossiers/` | Long-term internal project context records. Korean primary, English machine summary. |
| `public-candidates/` | Manually reviewed article candidates only. Nothing here publishes automatically. |

## Operating Rules

- Keep raw evidence and public storytelling separate.
- Keep the user as the subject, not the AI tools.
- Let raw user prompts and diary notes shape the existing dossier sections; do
  not hide them in a disconnected appendix.
- Use `dossiers/` for durable project context.
- Use `public-candidates/` only after the user asks to turn a dossier into public copy.
- Do not write to Supabase, CMS, or portfolio routes from this inventory.
- Do not auto-publish.

## Current Seed Dossiers

- `dossiers/portfolio.md`
- `dossiers/my1rm.md`
- `dossiers/tradinglab.md`

These three files started as quality pilots. They now live in the permanent
dossier location so future automation and review do not depend on a temporary
folder name.
