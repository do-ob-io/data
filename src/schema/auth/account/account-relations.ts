import { defineRelationsPart } from 'drizzle-orm/relations';

import { userTable } from '@/schema/auth/user/user-table.js';

import { accountTable } from './account-table.js';

/**
 * Relationships for the auth account table.
 */
export const accountRelations = defineRelationsPart(
  { accountTable, userTable },
  (r) => ({
    accountTable: {
      user: r.one.userTable({
        from: r.accountTable.userId,
        to: r.userTable.id,
        alias: 'account_user',
      }),
    },
  }),
);
