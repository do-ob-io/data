import { getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { EntityInsert } from './entity';
import { entityTable } from './entity';

describe('entity schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(entityTable)).toBe('entity');
  });

  test('should be able to insert and retrieve an entity', async ({ db, expect }) => {
    // Arrage
    const entityInsert: EntityInsert = {
      name: 'Test Entity',
      description: 'This is a test entity.',
      model: 'entity',
    };

    // Act
    const inserted = await db.insert(entityTable).values(entityInsert).returning();
    const result = await db.query.entityTable.findFirst({
      where: {
        id: inserted[0].id,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(entityInsert.name);
    expect(result?.description).toBe(entityInsert.description);
    expect(result?.model).toBe(entityInsert.model);
  });
});
