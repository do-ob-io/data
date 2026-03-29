import { defineRelationsPart } from 'drizzle-orm/relations';

import { accountTable } from '@/schema/auth/account/account-table.js';
import { invitationTable } from '@/schema/auth/invitation/invitation-table.js';
import { memberTable } from '@/schema/auth/member/member-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { teamMemberTable } from '@/schema/auth/team-member/team-member-table.js';
import { twoFactorTable } from '@/schema/auth/two-factor/two-factor-table.js';

import { userTable } from './user-table.js';

/**
 * Relationships for the auth user table.
 */
export const userRelations = defineRelationsPart(
  { userTable, sessionTable, accountTable, twoFactorTable, memberTable, teamMemberTable, invitationTable },
  (r) => ({
    userTable: {
      sessions: r.many.sessionTable({ alias: 'session_user' }),
      accounts: r.many.accountTable({ alias: 'account_user' }),
      twoFactor: r.one.twoFactorTable({ alias: 'twoFactor_user', optional: true }),
      members: r.many.memberTable({ alias: 'member_user' }),
      teamMembers: r.many.teamMemberTable({ alias: 'teamMember_user' }),
      invitations: r.many.invitationTable({ alias: 'invitation_inviter' }),
    },
  }),
);
