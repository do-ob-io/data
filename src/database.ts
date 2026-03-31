import { pushSchema } from 'drizzle-kit/api-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgliteDatabase } from 'drizzle-orm/pglite';
import type { AnyRelations } from 'drizzle-orm/relations';

import { SETTINGS } from './settings.js';

/**
 * The union of possible database instances returned by {@link createDatabase}.
 */
export type Database<
  S extends Record<string, unknown> = Record<string, unknown>,
  R extends AnyRelations = AnyRelations,
> =
  | PgliteDatabase<S, R>
  | NodePgDatabase<S, R>;

/**
 * Arguments for initializing a database via {@link createDatabase}.
 */
export interface DatabaseArgs {
  /**
   * The type of database to initialize and pull the schema and relations from.
   */
  type: 'auth' | 'world';
}

/**
 * Dynamically imports the schema and relations for the given database type.
 *
 * @param type - The category of schema to load.
 * @returns An object containing the merged schema tables and relations.
 */
async function loadSchemaAndRelations(type: DatabaseArgs['type']) {
  const { nodeTable } = await import('./schema/node/node-table.js');
  const { nodeRelations } = await import('./schema/node/node-relations.js');

  if (type === 'auth') {
    const { default: authSchema } = await import('./schema/auth/schema.js');
    const { default: authRelations } = await import('./schema/auth/relations.js');

    return {
      schema: { ...authSchema, nodeTable },
      relations: { ...nodeRelations, ...authRelations },
    };
  }

  const { default: worldSchema } = await import('./schema/world/schema.js');
  const { default: worldRelations } = await import('./schema/world/relations.js');

  return {
    schema: { ...worldSchema, nodeTable },
    relations: { ...nodeRelations, ...worldRelations },
  };
}

/**
 * Initializes a database connection.
 *
 * In development and test environments, an in-memory PGlite instance is created
 * and the schema is pushed automatically. In production, a `pg` connection pool
 * is used with the settings from environment variables (migrations are expected
 * to be applied externally).
 *
 * @param args - The arguments for initializing the database.
 * @returns A promise that resolves to a database instance.
 */
export async function createDatabase({ type }: DatabaseArgs): Promise<Database> {
  const { schema, relations } = await loadSchemaAndRelations(type);

  if (SETTINGS.NODE_ENV === 'production') {
    const { drizzle } = await import('drizzle-orm/node-postgres');

    return drizzle({
      connection: {
        host: SETTINGS.POSTGRES_HOST,
        port: Number.parseInt(SETTINGS.POSTGRES_PORT, 10),
        user: SETTINGS.POSTGRES_USER,
        password: SETTINGS.POSTGRES_PASSWORD,
        database: SETTINGS.POSTGRES_DB,
      },
      schema,
      relations,
    } as any) as unknown as Database;
  }

  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle } = await import('drizzle-orm/pglite');

  const client = new PGlite();
  const db = drizzle({
    client,
    schema,
    relations,
  } as any);

  const pushed = await pushSchema(schema, db as any);
  await pushed.apply();

  return db as unknown as Database;
}
