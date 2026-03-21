import { getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { EntityInsert } from './entity-models.js';
import { entityTable } from './entity-table.js';

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

  test('should create an entity with another entity as its parent', async ({ db, expect }) => {
    // Arrange
    const parentEntity: EntityInsert = {
      name: 'Parent Entity',
      description: 'This is the parent entity.',
      model: 'entity',
    };
    const insertedParent = await db.insert(entityTable).values(parentEntity).returning();

    const childEntity: EntityInsert = {
      name: 'Child Entity',
      description: 'This is the child entity.',
      model: 'entity',
      parentId: insertedParent[0].id,
    };

    // Act
    const insertedChild = await db.insert(entityTable).values(childEntity).returning();
    const childResult = await db.query.entityTable.findFirst({
      where: {
        id: insertedChild[0].id,
      },
      with: {
        parent: true,
      },
    });

    const parentResult = await db.query.entityTable.findFirst({
      where: {
        id: insertedParent[0].id,
      },
      with: {
        children: true,
      },
    });

    // Assert
    expect(childResult).toBeDefined();
    expect(childResult?.name).toBe(childEntity.name);
    expect(childResult?.description).toBe(childEntity.description);
    expect(childResult?.model).toBe(childEntity.model);
    expect(childResult?.parentId).toBe(childEntity.parentId);
    expect(childResult?.parent).toBeDefined();
    expect(childResult?.parent?.id).toBe(insertedParent[0].id);
    expect(childResult?.parent?.name).toBe(parentEntity.name);

    expect(parentResult).toBeDefined();
    expect(parentResult?.children).toBeDefined();
    expect(parentResult?.children?.length).toBe(1);
    expect(parentResult?.children?.[0].id).toBe(insertedChild[0].id);
  });
});
