import { sql } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

describe('database', () => {

  test('should have a valid database schema', async ({ db, expect }) => {
    const result = await db.execute(sql`SELECT * FROM information_schema.tables`);
    expect(result).toBeDefined();
    expect(result.rows.length).toBeGreaterThan(0);
  });
});
