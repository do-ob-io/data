/* eslint-disable no-empty-pattern */
import { PGlite } from '@electric-sql/pglite';
import { pushSchema } from 'drizzle-kit/api-postgres';
import { drizzle } from 'drizzle-orm/pglite';
import { test as baseTest } from 'vitest';

import relations from './relations.js';
import * as schema from './schema.js';

export const test = baseTest.extend('db', async ({}, { onCleanup }) => {
  const client = new PGlite();
  const db = drizzle({ client, schema, relations });

  const pushed = await pushSchema(schema, db as any);
  await pushed.apply();

  onCleanup(async () => {
    await db.$client.close();
  });

  return db;
});

export { describe, it, expect, beforeAll, afterAll } from 'vitest';
