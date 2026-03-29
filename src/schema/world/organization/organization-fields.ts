import { date, uuid, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';
import { addressTable } from '@/schema/world/address/address-table.js';

/**
 * Inheritable organization column definitions that extend base fields with organization-specific columns.
 *
 * @example
 * ```ts
 * export const myTable = pgTable('my_table', {
 *   ...organizationFields,
 *   // additional columns...
 * });
 * ```
 */
export const organizationFields = {
  ...baseFields,

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
};
