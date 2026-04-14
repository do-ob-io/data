import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const verificationFields = {
  /** Unique identifier for the verification record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Identifier for the verification target (e.g. email address). */
  identifier: varchar('identifier', { length: 320 }).notNull(),

  /** Verification token value. */
  value: text('value').notNull(),

  /** Timestamp when this verification token expires. */
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

  /** Timestamp when the verification record was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  /** Timestamp when the verification record was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
