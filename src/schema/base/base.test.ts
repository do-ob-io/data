import { getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { BaseInsert } from './base-models.js';
import { baseTable } from './base-table.js';

describe('base schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(baseTable)).toBe('base');
  });

  test('should be able to insert and retrieve a base', async ({ db, expect }) => {
    // Arrage
    const baseInsert: BaseInsert = {
      name: 'Test Base',
      description: 'This is a test base.',
      model: 'base',
    };

    // Act
    const inserted = await db.insert(baseTable).values(baseInsert).returning();
    const result = await db.query.baseTable.findFirst({
      where: {
        id: inserted[0].id,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(baseInsert.name);
    expect(result?.description).toBe(baseInsert.description);
    expect(result?.model).toBe(baseInsert.model);
  });

  test('should create a base with another base as its parent', async ({ db, expect }) => {
    // Arrange
    const parentBase: BaseInsert = {
      name: 'Parent Base',
      description: 'This is the parent base.',
      model: 'base',
    };
    const insertedParent = await db.insert(baseTable).values(parentBase).returning();

    const childBase: BaseInsert = {
      name: 'Child Base',
      description: 'This is the child base.',
      model: 'base',
      parentId: insertedParent[0].id,
    };

    // Act
    const insertedChild = await db.insert(baseTable).values(childBase).returning();
    const childResult = await db.query.baseTable.findFirst({
      where: {
        id: insertedChild[0].id,
      },
      with: {
        parent: true,
      },
    });

    const parentResult = await db.query.baseTable.findFirst({
      where: {
        id: insertedParent[0].id,
      },
      with: {
        children: true,
      },
    });

    // Assert
    expect(childResult).toBeDefined();
    expect(childResult?.name).toBe(childBase.name);
    expect(childResult?.description).toBe(childBase.description);
    expect(childResult?.model).toBe(childBase.model);
    expect(childResult?.parentId).toBe(childBase.parentId);
    expect(childResult?.parent).toBeDefined();
    expect(childResult?.parent?.id).toBe(insertedParent[0].id);
    expect(childResult?.parent?.name).toBe(parentBase.name);

    expect(parentResult).toBeDefined();
    expect(parentResult?.children).toBeDefined();
    expect(parentResult?.children?.length).toBe(1);
    expect(parentResult?.children?.[0].id).toBe(insertedChild[0].id);
  });
});
