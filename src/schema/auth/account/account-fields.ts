import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const accountFields = {
  ...baseFields,
  name: varchar({ length: 256 }),
  userId: uuid().notNull().references(() => userTable.id),
  accountId: varchar({ length: 256 }).notNull(),
  providerId: varchar({ length: 256 }).notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: timestamp({ withTimezone: true }),
  refreshTokenExpiresAt: timestamp({ withTimezone: true }),
  scope: text(),
  idToken: text(),
  password: text(),
};
