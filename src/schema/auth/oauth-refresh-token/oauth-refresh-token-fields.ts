import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const oauthRefreshTokenFields = {
  /** Unique identifier for the refresh token record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** The refresh token value. */
  token: text('token').notNull(),

  /** Client identifier referencing the OAuth client. */
  clientId: varchar('client_id', { length: 256 })
    .notNull()
    .references(() => oauthClientTable.clientId, { onDelete: 'cascade' }),

  /** Session identifier; set to null if the session is deleted. */
  sessionId: uuid('session_id').references(() => sessionTable.id, {
    onDelete: 'set null',
  }),

  /** Foreign key referencing the user who owns this refresh token. */
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),

  /** External reference identifier for cross-system linking. */
  referenceId: varchar('reference_id', { length: 256 }),

  /** Timestamp when the refresh token expires. */
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

  /** Timestamp when the refresh token was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),

  /** Timestamp when the refresh token was revoked; null if still active. */
  revoked: timestamp('revoked', { withTimezone: true }),

  /** Timestamp of the original authentication event. */
  authTime: timestamp('auth_time', { withTimezone: true }),

  /** OAuth scopes associated with this refresh token. */
  scopes: text('scopes').array().notNull(),
};
