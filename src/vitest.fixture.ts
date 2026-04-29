/* eslint-disable no-empty-pattern */

import { PGlite } from '@electric-sql/pglite';
import { pushSchema } from 'drizzle-kit/api-postgres';
import type { PgliteDatabase } from 'drizzle-orm/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { test as baseTest } from 'vitest';

import relations from './relations.js';
import * as schema from './schema.js';

type Database = PgliteDatabase<typeof schema>;

export const test = baseTest.extend<{ db: Database }>({
  // oxlint-disable-next-line eslint-plugin-react-hooks/rules-of-hooks
  db: [ async ({}, use) => {
    const client = new PGlite();
    await client.waitReady;
    const db = drizzle({ client, schema, relations });

    const pushed = await pushSchema(schema, db as any);
    await pushed.apply();

    await use(db);
    await db.$client.close();
  }, { scope: 'file' } ],
});

export { describe, it, expect, beforeAll, afterAll } from 'vitest';
