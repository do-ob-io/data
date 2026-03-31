import { pushSchema } from 'drizzle-kit/api-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Pool } from 'pg';

import type authRelations from './schema/auth/relations.js';
import type authSchema from './schema/auth/schema.js';
import type worldRelations from './schema/world/relations.js';
import type worldSchema from './schema/world/schema.js';
import { SETTINGS } from './settings.js';

/**
 * Schema type for the `auth` database (auth tables + shared node table).
 */
type AuthSchema = typeof authSchema;

/**
 * Relations type for the `auth` database (auth relations + node relations).
 */
type AuthRelations = typeof authRelations;

/**
 * Schema type for the `world` database (world tables + shared node table).
 */
type WorldSchema = typeof worldSchema;

/**
 * Relations type for the `world` database (world relations + node relations).
 */
type WorldRelations = typeof worldRelations;

/**
 * Maps each database type to its concrete `NodePgDatabase` instance.
 */
export interface DatabaseTypeMap {
  auth: NodePgDatabase<AuthSchema, AuthRelations>;
  world: NodePgDatabase<WorldSchema, WorldRelations>;
}

/**
 * A database instance for a given type.
 */
export type Database<T extends keyof DatabaseTypeMap = keyof DatabaseTypeMap> = DatabaseTypeMap[T] & { $client: Pool };

/**
 * Arguments for initializing a database via {@link createDatabase}.
 */
export interface DatabaseArgs<T extends keyof DatabaseTypeMap = keyof DatabaseTypeMap> {
  /**
   * The type of database to initialize and pull the schema and relations from.
   */
  type: T;
}

/**
 * Dynamically imports the schema and relations for the given database type.
 *
 * @param type - The category of schema to load.
 * @returns An object containing the merged schema tables and relations.
 */
async function loadSchemaAndRelations(type: keyof DatabaseTypeMap): Promise<{ schema: Record<string, any>; relations: Record<string, any> }> {
  if (type === 'auth') {
    const { default: authSchema } = await import('./schema/auth/schema.js');
    const { default: authRelations } = await import('./schema/auth/relations.js');

    return {
      schema: authSchema,
      relations: authRelations,
    };
  }

  const { default: worldSchema } = await import('./schema/world/schema.js');
  const { default: worldRelations } = await import('./schema/world/relations.js');

  return {
    schema: worldSchema,
    relations: worldRelations,
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
 * @returns A promise that resolves to a typed `NodePgDatabase` instance.
 */
export async function createDatabase<T extends keyof DatabaseTypeMap>(
  { type }: DatabaseArgs<T>,
) {
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
      schema: schema,
      relations: relations,
    }) as unknown as Database<T>;
  }

  const { drizzle: pgliteDrizzle } = await import('drizzle-orm/pglite');

  const db = pgliteDrizzle({
    schema,
    relations,
  } as any);
  (db.$client as any).end = db.$client.close;

  const pushed = await pushSchema(schema, db as any);
  await pushed.apply();

  return db as unknown as Database<T>;
}
