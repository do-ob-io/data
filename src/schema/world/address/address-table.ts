import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

import { entityTable } from '@/schema/entity/entity-table.js';

/**
 * Represents a postal address linked to a base entity.
 */
export const addressTable = pgTable('address', {
  /**
   * The unique identifier for the address, referencing the base entity.
   */
  id: uuid().primaryKey().references(() => entityTable.id).notNull(),

  /**
   * The primary street address for the location.
   */
  street: varchar({ length: 256 }),

  /**
   * A unit or suite identifier for the location.
   */
  unit: varchar({ length: 128 }),

  /**
   * The city or locality of the address.
   */
  locality: varchar({ length: 128 }),

  /**
   * The region or state of the address.
   */
  region: varchar({ length: 128 }),

  /**
   * The postal code of the address.
   */
  postal: varchar({ length: 32 }),

  /**
   * The country of the address.
   */
  country: varchar({ length: 128 }),

  /**
   * Additional address notes.
   */
  notes: text(),
});
