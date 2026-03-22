import { getTableName } from 'drizzle-orm';

import type { EntityInsert } from '@/schema/entity/index.js';
import { entityTable } from '@/schema/entity/index.js';
import { describe, test } from '@/vitest.fixture.js';

import type { AddressInsert } from './address-models.js';
import { addressTable } from './address-table.js';

describe('address schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(addressTable)).toBe('address');
  });

  test('should be able to insert and retrieve an address', async ({ db, expect }) => {
    // Arrange
    const entityInsert: EntityInsert = {
      name: 'Address Entity',
      description: 'Test address entity.',
      model: 'address',
    };
    const insertedEntity = await db.insert(entityTable).values(entityInsert).returning();

    const addressInsert: AddressInsert = {
      id: insertedEntity[0].id,
      street: '123 Example St',
      locality: 'Sampleville',
      region: 'State',
      postal: '12345',
      country: 'Wonderland',
      notes: 'Delivery instructions.',
    };

    // Act
    await db.insert(addressTable).values(addressInsert).returning();
    const result = await db.query.addressTable.findFirst({
      where: {
        id: addressInsert.id,
      },
      with: {
        entity: true,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.street).toBe(addressInsert.street);
    expect(result?.locality).toBe(addressInsert.locality);
    expect(result?.region).toBe(addressInsert.region);
    expect(result?.postal).toBe(addressInsert.postal);
    expect(result?.country).toBe(addressInsert.country);
    expect(result?.notes).toBe(addressInsert.notes);
    expect(result?.entity?.id).toBe(addressInsert.id);
    expect(result?.entity?.name).toBe(entityInsert.name);
  });
});
