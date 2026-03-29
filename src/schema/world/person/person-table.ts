import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { personFields } from './person-fields.js';

/**
 * Represents person-specific details.
 */
export const personTable = pgTable(`${TABLE_PREFIX}_person`, {
  ...personFields,
});

