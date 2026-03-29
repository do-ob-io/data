import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { invitationFields } from './invitation-fields.js';

/**
 * Represents a pending invitation to join an organization or team.
 */
export const invitationTable = pgTable(`${TABLE_PREFIX}_invitation`, {
  ...invitationFields,
});
