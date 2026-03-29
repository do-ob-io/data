import { getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { NodeInsert } from './node-models.js';
import { nodeTable } from './node-table.js';

describe('node schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(nodeTable)).toBe('node');
  });

  test('should be able to insert and retrieve a node', async ({ db, expect }) => {
    // Arrange
    const nodeInsert: NodeInsert = {
      name: 'Test Node',
      description: 'This is a test node.',
      model: 'node',
    };

    // Act
    const inserted = await db.insert(nodeTable).values(nodeInsert).returning();
    const result = await db.query.nodeTable.findFirst({
      where: {
        id: inserted[0].id,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(nodeInsert.name);
    expect(result?.description).toBe(nodeInsert.description);
    expect(result?.model).toBe(nodeInsert.model);
  });

  test('should create a node with another node as its parent', async ({ db, expect }) => {
    // Arrange
    const parentNode: NodeInsert = {
      name: 'Parent Node',
      description: 'This is the parent node.',
      model: 'node',
    };
    const insertedParent = await db.insert(nodeTable).values(parentNode).returning();

    const childNode: NodeInsert = {
      name: 'Child Node',
      description: 'This is the child node.',
      model: 'node',
      parentId: insertedParent[0].id,
    };

    // Act
    const insertedChild = await db.insert(nodeTable).values(childNode).returning();
    const childResult = await db.query.nodeTable.findFirst({
      where: {
        id: insertedChild[0].id,
      },
      with: {
        parent: true,
      },
    });

    const parentResult = await db.query.nodeTable.findFirst({
      where: {
        id: insertedParent[0].id,
      },
      with: {
        children: true,
      },
    });

    // Assert
    expect(childResult).toBeDefined();
    expect(childResult?.name).toBe(childNode.name);
    expect(childResult?.description).toBe(childNode.description);
    expect(childResult?.model).toBe(childNode.model);
    expect(childResult?.parentId).toBe(childNode.parentId);
    expect(childResult?.parent).toBeDefined();
    expect(childResult?.parent?.id).toBe(insertedParent[0].id);
    expect(childResult?.parent?.name).toBe(parentNode.name);

    expect(parentResult).toBeDefined();
    expect(parentResult?.children).toBeDefined();
    expect(parentResult?.children?.length).toBe(1);
    expect(parentResult?.children?.[0].id).toBe(insertedChild[0].id);
  });
});
