import { timestamp, uuid } from 'drizzle-orm/pg-core';

import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

export const teamMemberFields = {
  id: uuid().primaryKey().defaultRandom(),
  teamId: uuid().notNull().references(() => teamTable.id),
  userId: uuid().notNull().references(() => userTable.id),
  createdAt: timestamp({ withTimezone: true }),
};
