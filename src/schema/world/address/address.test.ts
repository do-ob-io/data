import { getTableName } from 'drizzle-orm';

import type { BaseInsert } from '@/schema/base/index.js';
import { baseTable } from '@/schema/base/index.js';
import { describe, test } from '@/vitest.fixture.js';

import type { AddressInsert } from './address-models.js';
import { addressTable } from './address-table.js';

describe('address schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(addressTable)).toBe('address');
  });

  test('should be able to insert and retrieve an address', async ({ db, expect }) => {
    // Arrange
    const baseInsert: BaseInsert = {
      name: 'Address Base',
      description: 'Test address base.',
      model: 'address',
    };
    const insertedBase = await db.insert(baseTable).values(baseInsert).returning();

    const addressInsert: AddressInsert = {
      id: insertedBase[0].id,
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
        base: true,
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
    expect(result?.base?.id).toBe(addressInsert.id);
    expect(result?.base?.name).toBe(baseInsert.name);
  });
});
