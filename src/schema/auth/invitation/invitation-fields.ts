import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const invitationFields = {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 320 }).notNull(),
  inviterId: uuid().notNull().references(() => userTable.id),
  organizationId: uuid().notNull().references(() => organizationTable.id),
  role: varchar({ length: 256 }),
  status: varchar({ length: 64 }).notNull().default('pending'),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
  teamId: uuid().references(() => teamTable.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
};
