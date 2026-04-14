import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { userTable } from '@/schema/auth/user/user-table.js';

export const accountFields = {
  /** Unique identifier for the account record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Provider-specific account identifier. */
  accountId: varchar('account_id', { length: 256 }).notNull(),

  /** Authentication provider identifier (e.g. "credential", "google"). */
  providerId: varchar('provider_id', { length: 256 }).notNull(),

  /** Foreign key referencing the user who owns this account. */
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),

  /** OAuth access token issued by the provider. */
  accessToken: text('access_token'),

  /** OAuth refresh token issued by the provider. */
  refreshToken: text('refresh_token'),

  /** OpenID Connect ID token. */
  idToken: text('id_token'),

  /** Timestamp when the access token expires. */
  accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),

  /** Timestamp when the refresh token expires. */
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),

  /** OAuth scopes granted to this account. */
  scope: text('scope'),

  /** Hashed password for credential-based accounts. */
  password: text('password'),

  /** Timestamp when the account record was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  /** Timestamp when the account record was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
