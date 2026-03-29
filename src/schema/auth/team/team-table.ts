import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { teamFields } from './team-fields.js';

/**
 * Represents a sub-group team within an organization.
 */
export const teamTable = pgTable(`${TABLE_PREFIX}_team`, {
  ...teamFields,
});
