import { date, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';
import { addressTable } from '@/schema/world/address/address-table.js';
import { organizationTable } from '@/schema/world/organization/organization-table.js';

/**
 * Represents person-specific details.
 */
export const personTable = pgTable('person', {
  ...baseFields,

  /**
   * The given name of the person.
   */
  given: varchar({ length: 128 }),

  /**
   * The family name of the person.
   */
  family: varchar({ length: 128 }),

  /**
   * The middle name of the person.
   */
  middle: varchar({ length: 128 }),

  /**
   * The honorific prefix of the person.
   */
  prefix: varchar({ length: 64 }),

  /**
   * The honorific suffix of the person.
   */
  suffix: varchar({ length: 64 }),

  /**
   * The gender of the person.
   */
  gender: varchar({ length: 64 }),

  /**
   * The birth date of the person.
   */
  birth: date(),

  /**
   * The death date of the person.
   */
  death: date(),

  /**
   * The email address of the person.
   */
  email: varchar({ length: 320 }),

  /**
   * The phone number of the person.
   */
  phone: varchar({ length: 32 }),

  /**
   * The job title of the person.
   */
  job: varchar({ length: 256 }),

  /**
   * The nationality of the person.
   */
  nationality: varchar({ length: 128 }),

  /**
   * A short biography of the person.
   */
  bio: text(),

  /**
   * The unique identifier that references the organization the person is affiliated with.
   */
  organizationId: uuid().references(() => organizationTable.id),

  /**
   * The unique identifier that references the person's primary address.
   */
  addressId: uuid().references(() => addressTable.id),
});
