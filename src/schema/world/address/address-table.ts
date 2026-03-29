import { pgTable } from 'drizzle-orm/pg-core';

import { addressFields } from './address-fields.js';

/**
 * Represents a postal address.
 */
export const addressTable = pgTable('address', {
  ...addressFields,
});
