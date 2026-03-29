import { getTableName } from 'drizzle-orm';

import type { EntityInsert } from '@/schema/entity/index.js';
import { entityTable } from '@/schema/entity/index.js';
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

    const entityInsert: EntityInsert = {
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
    const insertedEntity = await db.transaction(async (tx) => {
      const insertedEntity = await tx.insert(entityTable).values(entityInsert).returning();
      return tx.insert(personTable).values({
        id: insertedEntity[0].id,
        ...personValues,
      }).returning();
    });

    const result = await db.query.personTable.findFirst({
      where: {
        id: insertedEntity[0].id,
      },
      with: {
        entity: true,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.given).toBe(personInsert.given);
    expect(result?.family).toBe(personInsert.family);
    expect(result?.email).toBe(personInsert.email);
    expect(result?.job).toBe(personInsert.job);
    expect(result?.nationality).toBe(personInsert.nationality);
    expect(result?.entity?.id).toBe(insertedEntity[0].id);
    expect(result?.entity?.name).toBe(entityInsert.name);
  });
});
