import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { verificationFields } from './verification-fields.js';

/**
 * Stores short-lived verification tokens (e.g. email verification, password reset).
 */
export const verificationTable = pgTable(`${TABLE_PREFIX}_verification`, {
  ...verificationFields,
});
