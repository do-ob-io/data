import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { sessionFields } from './session-fields.js';

/**
 * Represents an authenticated user session.
 */
export const sessionTable = pgTable(`${TABLE_PREFIX}_session`, {
  ...sessionFields,
});
