# Portfolio — CC/CX File Ownership

| Domain | File/Directory | Owner | Rationale |
|--------|---------------|:-----:|-----------|
| All | src/** | CX | Static site, all UI work |
| Project Data | src/data/projects.ts | CX | Static data |

> CC involvement only when architectural changes are needed.

## Review Boundaries

- Static content and visual presentation changes stay in `src/**` and should preserve the existing static-site deployment path.
- Project-card data changes belong in `src/data/projects.ts`; update screenshots, labels, links, and sort/grouping assumptions together.
- Build/deploy metadata belongs in `docs/deploy.md` and `config/projects.json`, not in component comments.
- Portfolio has no project-owned shared database; do not add data-schema claims unless persistent storage is introduced.
- Use focused static checks for copy/data changes and the configured project verification command for UI or build-affecting changes.
