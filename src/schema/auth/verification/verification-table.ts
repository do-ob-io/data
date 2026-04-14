import { index, pgTable } from 'drizzle-orm/pg-core';

import { verificationFields } from './verification-fields.js';

/**
 * Stores short-lived verification tokens (e.g. email verification, password reset).
 */
export const verificationTable = pgTable(
  'verification',
  { ...verificationFields },
  (table) => [ index('verification_identifier_idx').on(table.identifier) ],
);
