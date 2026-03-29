import { defineRelationsPart } from 'drizzle-orm/relations';

import { userTable } from '@/schema/auth/user/user-table.js';

import { twoFactorTable } from './two-factor-table.js';

/**
 * Relationships for the auth two-factor table.
 */
export const twoFactorRelations = defineRelationsPart(
  { twoFactorTable, userTable },
  (r) => ({
    twoFactorTable: {
      user: r.one.userTable({
        from: r.twoFactorTable.userId,
        to: r.userTable.id,
        alias: 'twoFactor_user',
      }),
    },
  }),
);
