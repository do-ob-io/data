import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { userFields } from './user-fields.js';

/**
 * Represents an authenticated user identity.
 */
export const userTable = pgTable(`${TABLE_PREFIX}_user`, {
  ...userFields,
});
