import { index, pgTable } from 'drizzle-orm/pg-core';

import { sessionFields } from './session-fields.js';

/**
 * Represents an authenticated user session.
 */
export const sessionTable = pgTable(
  'session',
  { ...sessionFields },
  (table) => [ index('session_userId_idx').on(table.userId) ],
);
