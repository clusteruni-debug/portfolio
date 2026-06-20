# Data Schema - Portfolio

> Backend: Supabase where dynamic content is enabled.
> Source of truth: Supabase client calls and any future migration files.

## Data Areas

| Area | Purpose |
|---|---|
| Projects/content | Portfolio items and rich text content. |
| Media references | Public image or asset URLs used by portfolio pages. |

## Change Rules

- Add migrations or schema docs before making durable table/column changes.
- Keep static fallback behavior working when Supabase config is absent.
- Do not hardcode Supabase secrets.

