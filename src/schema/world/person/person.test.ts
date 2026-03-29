import { getTableName } from 'drizzle-orm';

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

    // Act
    const inserted = await db.insert(personTable).values(personInsert).returning();
    const result = await db.query.personTable.findFirst({
      where: {
        id: inserted[0].id,
      },
    });

    // Assert
    expect(result).toMatchObject(personInsert);
  });
});
