import { pgTable } from 'drizzle-orm/pg-core';

import { personFields } from './person-fields.js';

/**
 * Represents person-specific details.
 */
export const personTable = pgTable('person', {
  ...personFields,
});

