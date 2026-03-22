# Data Library

Typed data access layer for the do-ob workspace, providing Drizzle ORM schemas, relations, and models.

## Quality Instructions

- **Typecheck**: `tsc --noEmit` — Run from project directory
- **Lint**: `eslint --fix .` — Run from project directory
- **Test**: `vitest run` — Run from workspace root directory
- **Build**: `pnpm build` — Run from project directory

## Structure

> **Keep this section up to date** whenever schema directories or files are added, removed, or reorganized.

- `src/schema/` — Schema modules split into table, relations, and models per data type
  - `entity/` — Abstract base table used for table inheritance
  - `world/` — Real-world data types (person, organization, address, etc.)
  - `account/` — Account-related data for identity and authn/authz _(planned)_
- `src/relations.ts` — Aggregate export of all schema relations
- `src/schema.ts` — Aggregate export of schema tables
- `src/index.ts` — Package entrypoint

## Schema Conventions

- Each schema type lives in `src/schema/<group>/<name>/` with `<name>-table.ts`, `<name>-relations.ts`, and `<name>-models.ts`.
- `<name>/index.ts` only exports the table and models, not relations.
- Relations are registered in `src/relations.ts` and imported from `<name>-relations.ts`.
- `entity` is an abstract table — use it as a base via table inheritance, not directly.
- Group schemas by domain under `src/schema/<group>/`; each group has its own `schema.ts` that aggregates its tables.
- Prefer single-word property names when ambiguity is low.

## Technical Stack

- **Language**: TypeScript
- **Key Libraries**: drizzle-orm, zod, pg, @electric-sql/pglite
- **Build Tool**: tsdown
