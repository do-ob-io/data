import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const memberFields = {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => userTable.id),
  organizationId: uuid().notNull().references(() => organizationTable.id),
  role: varchar({ length: 256 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
};
