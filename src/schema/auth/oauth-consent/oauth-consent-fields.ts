import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const oauthConsentFields = {
  /** Unique identifier for the consent record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Client identifier referencing the OAuth client. */
  clientId: varchar('client_id', { length: 256 })
    .notNull()
    .references(() => oauthClientTable.clientId, { onDelete: 'cascade' }),

  /** Foreign key referencing the user who granted consent. */
  userId: uuid('user_id').references(() => userTable.id, { onDelete: 'cascade' }),

  /** External reference identifier for cross-system linking. */
  referenceId: varchar('reference_id', { length: 256 }),

  /** OAuth scopes the user consented to. */
  scopes: text('scopes').array().notNull(),

  /** Timestamp when consent was initially granted. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),

  /** Timestamp when consent was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
};
