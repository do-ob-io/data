import { text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';

export const verificationFields = {
  ...baseFields,
  name: varchar({ length: 256 }),
  identifier: varchar({ length: 320 }).notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
};
