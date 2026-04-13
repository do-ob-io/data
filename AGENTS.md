# Data Library

Typed data access layer for the do-ob workspace, providing Drizzle ORM schemas, relations, and models.

## Quality Instructions

- **Typecheck**: `tsc --noEmit` — Run from project directory
- **Lint**: `pnpm lint` — Run from project directory
- **Test**: `pnpm test` — Run from workspace root directory
- **Build**: `pnpm build` — Run from project directory

## Structure

> **Keep this section up to date** whenever schema directories or files are added, removed, or reorganized.

- `src/schema/` — Schema modules split into table, relations, and models per data type
  - `base/` — Abstract base fields used for field inheritance (not a table)
  - `node/` — Node table built on base fields with relationship columns
  - `world/` — Real-world data types (person, organization, address, etc.)
  - `auth/` — Authentication and authorization data for use with `better-auth`
    - `user/` — Authenticated user identity
    - `session/` — Active user sessions with token and expiry
    - `account/` — Linked provider accounts (OAuth, credential, etc.)
    - `verification/` — Short-lived tokens for email verification and password reset
    - `two-factor/` — TOTP secrets and backup codes (two-factor plugin)
    - `organization/` — Multi-tenant organization workspaces (org plugin)
    - `member/` — User membership within an organization (org plugin)
    - `invitation/` — Pending invitations to organizations or teams (org plugin)
    - `team/` — Sub-groups within an organization (org plugin with teams)
    - `team-member/` — User membership within a team (org plugin with teams)
- `src/relations.ts` — Aggregate export of all schema relations
- `src/schema.ts` — Aggregate export of schema tables
- `src/index.ts` — Package entrypoint

## Schema Conventions

- Each schema type lives in `src/schema/<group>/<name>/` with `<name>-fields.ts`, `<name>-table.ts`, `<name>-relations.ts`, and `<name>-models.ts`.
- `<name>-fields.ts` defines the raw column object (spreadable into `pgTable`).
- `<name>-table.ts` wraps fields in `pgTable`.
- `<name>/index.ts` only exports the table and models, not relations.
- Relations are registered in `src/relations.ts` and imported from `<name>-relations.ts`.
- `base` provides inheritable fields via `baseFields` — spread into tables rather than inheriting via FK.
- Group schemas by domain under `src/schema/<group>/`; each group has its own `schema.ts` that aggregates its tables.
- Each group has a `settings.ts` that exports `TABLE_PREFIX` — used only in the `pgTable` name string (e.g., `` `${TABLE_PREFIX}_user` ``) to namespace DB table names and avoid collisions.
- Prefer single-word property names when ambiguity is low.

## Technical Stack

- **Language**: TypeScript
- **Key Libraries**: drizzle-orm, zod, pg, @electric-sql/pglite
- **Build Tool**: tsdown
