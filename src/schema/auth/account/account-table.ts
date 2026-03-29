import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { accountFields } from './account-fields.js';

/**
 * Represents a linked authentication provider account for a user.
 */
export const accountTable = pgTable(`${TABLE_PREFIX}_account`, {
  ...accountFields,
});
