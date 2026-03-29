import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { memberFields } from './member-fields.js';

/**
 * Represents a user's membership within an organization.
 */
export const memberTable = pgTable(`${TABLE_PREFIX}_member`, {
  ...memberFields,
});
