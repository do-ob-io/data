import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const oauthAccessTokenFields = {
  /** Unique identifier for the access token record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** The access token value; must be unique. */
  token: text('token').notNull().unique(),

  /** Client identifier referencing the OAuth client. */
  clientId: varchar('client_id', { length: 256 })
    .notNull()
    .references(() => oauthClientTable.clientId, { onDelete: 'cascade' }),

  /** Session identifier; set to null if the session is deleted. */
  sessionId: uuid('session_id').references(() => sessionTable.id, {
    onDelete: 'set null',
  }),

  /** Foreign key referencing the user; null for client-credentials grants. */
  userId: uuid('user_id').references(() => userTable.id, { onDelete: 'cascade' }),

  /** External reference identifier for cross-system linking. */
  referenceId: varchar('reference_id', { length: 256 }),

  /** Foreign key referencing the refresh token this access token was derived from. */
  refreshId: uuid('refresh_id').references(() => oauthRefreshTokenTable.id, {
    onDelete: 'cascade',
  }),

  /** Timestamp when the access token expires. */
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

  /** Timestamp when the access token was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),

  /** OAuth scopes associated with this access token. */
  scopes: text('scopes').array().notNull(),
};
