import { sql } from 'drizzle-orm';
import { describe, expect, test } from 'vitest';

import { test as fixtureTest } from '@/vitest.fixture.js';

import { createDatabase } from './database.js';


describe('database', () => {

  fixtureTest('should have a valid database schema', async ({ db, expect }) => {
    const result = await db.execute(sql`SELECT * FROM information_schema.tables`);
    expect(result).toBeDefined();
    expect(result.rows.length).toBeGreaterThan(0);
  });

  test('should create an auth database with auth schema tables', async () => {
    const db = await createDatabase({ type: 'auth' });

    const result = await db.execute(sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    const tableNames = result.rows.map((r) => (r as { table_name: string }).table_name);

    expect(tableNames).toContain('user');

    await db.$client.end();
  });

  test('should create a world database with world schema tables', async () => {
    const db = await createDatabase({ type: 'world' });

    const result = await db.execute(sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    const tableNames = result.rows.map((r) => (r as { table_name: string }).table_name);

    expect(tableNames).toContain('world_address');
    expect(tableNames).toContain('world_person');
    expect(tableNames).toContain('world_organization');

    await db.$client.end();
  });
});
