import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { addressFields } from './address-fields.js';

/**
 * Represents a postal address.
 */
export const addressTable = pgTable(`${TABLE_PREFIX}_address`, {
  ...addressFields,
});
