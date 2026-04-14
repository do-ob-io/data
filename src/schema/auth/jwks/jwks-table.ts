import { pgTable } from 'drizzle-orm/pg-core';

import { jwksFields } from './jwks-fields.js';

/**
 * Stores JSON Web Key Sets used for signing and verifying tokens.
 */
export const jwksTable = pgTable('jwks', {
  ...jwksFields,
});
