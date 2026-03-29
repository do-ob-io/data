import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { teamMemberFields } from './team-member-fields.js';

/**
 * Represents a user's membership within a team.
 */
export const teamMemberTable = pgTable(`${TABLE_PREFIX}_team_member`, {
  ...teamMemberFields,
});
