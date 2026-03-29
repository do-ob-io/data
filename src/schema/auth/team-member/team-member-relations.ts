import { defineRelationsPart } from 'drizzle-orm/relations';

import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { teamMemberTable } from './team-member-table.js';

/**
 * Relationships for the auth team-member table.
 */
export const teamMemberRelations = defineRelationsPart(
  { teamMemberTable, teamTable, userTable },
  (r) => ({
    teamMemberTable: {
      team: r.one.teamTable({
        from: r.teamMemberTable.teamId,
        to: r.teamTable.id,
        alias: 'teamMember_team',
      }),
      user: r.one.userTable({
        from: r.teamMemberTable.userId,
        to: r.userTable.id,
        alias: 'teamMember_user',
      }),
    },
  }),
);
