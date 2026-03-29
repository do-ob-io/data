import { text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const sessionFields = {
  ...baseFields,
  name: varchar({ length: 256 }),
  userId: uuid().notNull().references(() => userTable.id),
  token: text().notNull().unique(),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
  ipAddress: varchar({ length: 45 }),
  userAgent: text(),
  activeOrganizationId: uuid(),
  activeTeamId: uuid(),
};
