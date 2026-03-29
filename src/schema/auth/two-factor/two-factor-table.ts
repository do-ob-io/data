import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { twoFactorFields } from './two-factor-fields.js';

/**
 * Stores TOTP secrets and backup codes for two-factor authentication.
 */
export const twoFactorTable = pgTable(`${TABLE_PREFIX}_two_factor`, {
  ...twoFactorFields,
});
