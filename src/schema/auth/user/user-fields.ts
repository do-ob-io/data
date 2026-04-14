import { boolean, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userFields = {
  /** Unique identifier for the user. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Display name of the user. */
  name: varchar('name', { length: 256 }).notNull(),

  /** Email address of the user; must be unique. */
  email: varchar('email', { length: 320 }).notNull().unique(),

  /** Whether the user's email address has been verified. */
  emailVerified: boolean('email_verified').notNull().default(false),

  /** URL to the user's avatar or profile image. */
  image: varchar('image', { length: 2048 }),

  /** Timestamp when the user record was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  /** Timestamp when the user record was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
