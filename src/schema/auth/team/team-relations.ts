import { defineRelationsPart } from 'drizzle-orm/relations';

import { invitationTable } from '@/schema/auth/invitation/invitation-table.js';
import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { teamMemberTable } from '@/schema/auth/team-member/team-member-table.js';

import { teamTable } from './team-table.js';

/**
 * Relationships for the auth team table.
 */
export const teamRelations = defineRelationsPart(
  { teamTable, organizationTable, teamMemberTable, invitationTable, sessionTable },
  (r) => ({
    teamTable: {
      organization: r.one.organizationTable({
        from: r.teamTable.organizationId,
        to: r.organizationTable.id,
        alias: 'team_org',
      }),
      members: r.many.teamMemberTable({ alias: 'teamMember_team' }),
      invitations: r.many.invitationTable({ alias: 'invitation_team' }),
      activeSessions: r.many.sessionTable({ alias: 'session_active_team' }),
    },
  }),
);
