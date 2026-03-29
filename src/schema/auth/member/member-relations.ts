import { defineRelationsPart } from 'drizzle-orm/relations';

import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { memberTable } from './member-table.js';

/**
 * Relationships for the auth member table.
 */
export const memberRelations = defineRelationsPart(
  { memberTable, userTable, organizationTable },
  (r) => ({
    memberTable: {
      user: r.one.userTable({
        from: r.memberTable.userId,
        to: r.userTable.id,
        alias: 'member_user',
      }),
      organization: r.one.organizationTable({
        from: r.memberTable.organizationId,
        to: r.organizationTable.id,
        alias: 'member_org',
      }),
    },
  }),
);
