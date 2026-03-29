import { text, uuid } from 'drizzle-orm/pg-core';

import { userTable } from '@/schema/auth/user/user-table.js';

export const twoFactorFields = {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => userTable.id),
  secret: text().notNull(),
  backupCodes: text().notNull(),
};
