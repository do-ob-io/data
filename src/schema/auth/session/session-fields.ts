import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { userTable } from '@/schema/auth/user/user-table.js';

export const sessionFields = {
  /** Unique identifier for the session. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Timestamp when the session expires. */
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

  /** Unique session token used for authentication. */
  token: text('token').notNull().unique(),

  /** Timestamp when the session was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  /** Timestamp when the session was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  /** IP address of the client that created the session. */
  ipAddress: varchar('ip_address', { length: 45 }),

  /** User agent string of the client that created the session. */
  userAgent: text('user_agent'),

  /** Foreign key referencing the user who owns this session. */
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
};
