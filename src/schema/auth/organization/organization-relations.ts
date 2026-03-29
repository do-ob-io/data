import { defineRelationsPart } from 'drizzle-orm/relations';

import { invitationTable } from '@/schema/auth/invitation/invitation-table.js';
import { memberTable } from '@/schema/auth/member/member-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { teamTable } from '@/schema/auth/team/team-table.js';

import { organizationTable } from './organization-table.js';

/**
 * Relationships for the auth organization table.
 */
export const organizationRelations = defineRelationsPart(
  { organizationTable, memberTable, invitationTable, teamTable, sessionTable },
  (r) => ({
    organizationTable: {
      members: r.many.memberTable({ alias: 'member_org' }),
      invitations: r.many.invitationTable({ alias: 'invitation_org' }),
      teams: r.many.teamTable({ alias: 'team_org' }),
      activeSessions: r.many.sessionTable({ alias: 'session_active_org' }),
    },
  }),
);
