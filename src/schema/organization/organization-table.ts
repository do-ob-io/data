import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { addressTable } from '../address/address-table.js';
import { entityTable } from '../entity/entity-table.js';

/**
 * Represents organization-specific details linked to a base entity.
 */
export const organizationTable = pgTable('organization', {
  /**
   * The unique identifier for the organization, referencing the base entity.
   */
  id: uuid().primaryKey().references(() => entityTable.id).notNull(),

  /**
   * The legal name of the organization.
   */
  legal: varchar({ length: 256 }),

  /**
   * The tax identifier of the organization.
   */
  tax: varchar({ length: 128 }),

  /**
   * The primary email address for the organization.
   */
  email: varchar({ length: 320 }),

  /**
   * The primary phone number for the organization.
   */
  phone: varchar({ length: 32 }),

  /**
   * The primary website URL for the organization.
   */
  url: varchar({ length: 2048 }),

  /**
   * The industry the organization operates in.
   */
  industry: varchar({ length: 256 }),

  /**
   * The founding date of the organization.
   */
  founded: date(),

  /**
   * The unique identifier that references the primary address for the organization.
   */
  addressId: uuid().references(() => addressTable.id),
});
