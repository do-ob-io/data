import { index, pgTable } from 'drizzle-orm/pg-core';

import { accountFields } from './account-fields.js';

/**
 * Represents a linked authentication provider account for a user.
 */
export const accountTable = pgTable(
  'account',
  { ...accountFields },
  (table) => [ index('account_userId_idx').on(table.userId) ],
);
