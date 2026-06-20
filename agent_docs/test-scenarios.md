# Portfolio Test Scenarios

## 1. Startup
- `npm run dev` starts on port 5110.
- Home page renders without runtime errors.

## 2. Content
- Project list renders.
- Portfolio detail or rich text content renders.
- Missing Supabase config fails closed if the data source is unavailable.

## 3. Public Page
- Build output has no TypeScript or Next.js errors.
- Images and public assets resolve.
- SEO metadata is present on public pages where applicable.

## 4. Verification
- `npm run build` passes.

