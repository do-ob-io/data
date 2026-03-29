import { getTableName, eq } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { AddressInsert } from './address-models.js';
import { addressTable } from './address-table.js';

describe('address schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(addressTable)).toBe('address');
  });

  test('should be able to insert and retrieve an address', async ({ db, expect }) => {
    // Arrange
    const addressInsert: AddressInsert = {
      name: 'Address Base',
      description: 'Test address base.',
      street: '123 Example St',
      locality: 'Sampleville',
      region: 'State',
      postal: '12345',
      country: 'Wonderland',
      notes: 'Delivery instructions.',
    };

    // Act
    const inserted = await db.insert(addressTable).values(addressInsert).returning();
    const [ result ] = await db.select().from(addressTable).where(eq(addressTable.id, inserted[0].id));

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(addressInsert.name);
    expect(result?.street).toBe(addressInsert.street);
    expect(result?.locality).toBe(addressInsert.locality);
    expect(result?.region).toBe(addressInsert.region);
    expect(result?.postal).toBe(addressInsert.postal);
    expect(result?.country).toBe(addressInsert.country);
    expect(result?.notes).toBe(addressInsert.notes);
  });
});
