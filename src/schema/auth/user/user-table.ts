import { pgTable } from 'drizzle-orm/pg-core';

import { userFields } from './user-fields.js';

/**
 * Represents an authenticated user identity.
 */
export const userTable = pgTable('user', {
  ...userFields,
});
