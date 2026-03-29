import { defineRelationsPart } from 'drizzle-orm/relations';

import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { invitationTable } from './invitation-table.js';

/**
 * Relationships for the auth invitation table.
 */
export const invitationRelations = defineRelationsPart(
  { invitationTable, userTable, organizationTable, teamTable },
  (r) => ({
    invitationTable: {
      inviter: r.one.userTable({
        from: r.invitationTable.inviterId,
        to: r.userTable.id,
        alias: 'invitation_inviter',
      }),
      organization: r.one.organizationTable({
        from: r.invitationTable.organizationId,
        to: r.organizationTable.id,
        alias: 'invitation_org',
      }),
      team: r.one.teamTable({
        from: r.invitationTable.teamId,
        to: r.teamTable.id,
        optional: true,
        alias: 'invitation_team',
      }),
    },
  }),
);
