# Deploy - Portfolio

Target: Vercel.

## Local Runtime

```powershell
npm run dev
```

Port: `5110`.

## Build

```powershell
npm run build
```

## Environment

Use `.env.local` manually only. Do not edit env files through agents.

Expected categories:

- Supabase URL/key where content is backed by Supabase
- Public asset/config values

## Smoke

1. Build passes.
2. Home page loads.
3. Project/content sections render.
4. Public images and metadata resolve.

