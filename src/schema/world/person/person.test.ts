import { getTableName } from 'drizzle-orm';

import type { BaseInsert } from '@/schema/base/index.js';
import { baseTable } from '@/schema/base/index.js';
import { describe, test } from '@/vitest.fixture.js';

import type { PersonInsert } from './person-models.js';
import { personTable } from './person-table.js';

describe('person schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(personTable)).toBe('person');
  });

  test('should be able to insert and retrieve a person', async ({ db, expect }) => {
    // Arrange
    const personInsert: PersonInsert = {
      name: 'Ada Lovelace',
      description: 'Test person entity.',
      given: 'Ada',
      family: 'Lovelace',
      email: 'ada@example.com',
      job: 'Mathematician',
      nationality: 'British',
    };

    const {
      name,
      alias,
      description,
      url,
      imageId,
      ownerId,
      creatorId,
      parentId,
      ...personValues
    } = personInsert;

    const baseInsert: BaseInsert = {
      name,
      model: 'person',
      alias,
      description,
      url,
      imageId,
      ownerId,
      creatorId,
      parentId,
    };

    // Act
    const insertedBase = await db.transaction(async (tx) => {
      const insertedBase = await tx.insert(baseTable).values(baseInsert).returning();
      return tx.insert(personTable).values({
        id: insertedBase[0].id,
        ...personValues,
      }).returning();
    });

    const result = await db.query.personTable.findFirst({
      where: {
        id: insertedBase[0].id,
      },
      with: {
        base: true,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.given).toBe(personInsert.given);
    expect(result?.family).toBe(personInsert.family);
    expect(result?.email).toBe(personInsert.email);
    expect(result?.job).toBe(personInsert.job);
    expect(result?.nationality).toBe(personInsert.nationality);
    expect(result?.base?.id).toBe(insertedBase[0].id);
    expect(result?.base?.name).toBe(baseInsert.name);
  });
});
