import { text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const jwksFields = {
  /** Unique identifier for the JWKS key entry. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** PEM-encoded public key. */
  publicKey: text('public_key').notNull(),

  /** PEM-encoded private key. */
  privateKey: text('private_key').notNull(),

  /** Timestamp when the key was created. */
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),

  /** Timestamp when the key expires; null means no expiry. */
  expiresAt: timestamp('expires_at', { withTimezone: true }),
};
