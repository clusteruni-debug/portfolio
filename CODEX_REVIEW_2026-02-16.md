# Codex Review Report

- Project: `portfolio`
- Reviewer: `Codex (GPT-5 coding agent)`
- Date: `2026-02-16`
- Scope: Static review + lint/build sanity check

## Findings

### 1) [Medium] Event listener cleanup bug in `ParticleBackground` can leak resize handlers

- File:
  - `src/components/effects/ParticleBackground.tsx:81`
  - `src/components/effects/ParticleBackground.tsx:88`
- Observation:
  - `addEventListener('resize', () => { ... })` uses an anonymous function.
  - Cleanup calls `removeEventListener('resize', resize)` with a different function reference.
- Impact:
  - If this component is mounted/unmounted repeatedly, resize listeners accumulate.
- Recommended fix:
  - Store a stable handler reference (e.g., `const handleResize = () => { ... }`) and use the same reference in add/remove.

### 2) [Low] Contact email is placeholder value

- File:
  - `src/components/sections/ContactSection.tsx:33`
- Observation:
  - `mailto:contact@example.com` is not an operational inbox.
- Impact:
  - Users clicking Email contact may fail to reach owner.
- Recommended fix:
  - Replace with real contact address or remove email CTA.

### 3) [Low] `ParticleBackground` appears unused in app composition

- Files:
  - `src/App.tsx:7`
  - `src/App.tsx:12`
- Observation:
  - `App` currently renders `MouseGlow` only; `ParticleBackground` is not mounted.
- Impact:
  - Dead code path increases maintenance overhead and can hide regressions.
- Recommended fix:
  - Either remove unused component or intentionally mount it with a clear performance budget.

## Validation Notes

- `npm run lint`: passed.
- `npm run build`: failed in this environment with `spawn EPERM` (tool/runtime permission issue), so full production build verification could not be completed here.
