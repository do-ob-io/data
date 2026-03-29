import { defineRelationsPart } from 'drizzle-orm/relations';

import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { sessionTable } from './session-table.js';

/**
 * Relationships for the auth session table.
 */
export const sessionRelations = defineRelationsPart(
  { sessionTable, userTable, organizationTable, teamTable },
  (r) => ({
    sessionTable: {
      user: r.one.userTable({
        from: r.sessionTable.userId,
        to: r.userTable.id,
        alias: 'session_user',
      }),
      activeOrganization: r.one.organizationTable({
        from: r.sessionTable.activeOrganizationId,
        to: r.organizationTable.id,
        optional: true,
        alias: 'session_active_org',
      }),
      activeTeam: r.one.teamTable({
        from: r.sessionTable.activeTeamId,
        to: r.teamTable.id,
        optional: true,
        alias: 'session_active_team',
      }),
    },
  }),
);
