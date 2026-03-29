import { defineRelationsPart } from 'drizzle-orm/relations';

import { accountTable } from './account/account-table.js';
import { invitationTable } from './invitation/invitation-table.js';
import { memberTable } from './member/member-table.js';
import { organizationTable } from './organization/organization-table.js';
import { sessionTable } from './session/session-table.js';
import { teamTable } from './team/team-table.js';
import { teamMemberTable } from './team-member/team-member-table.js';
import { twoFactorTable } from './two-factor/two-factor-table.js';
import { userTable } from './user/user-table.js';

/**
 * All auth schema relationships defined in a single part so that every
 * `r.many` is paired with its reverse `r.one` (with `from`/`to`) in the same
 * `defineRelationsPart` call, as required by Drizzle ORM v2 beta.
 */
export const authRelations = defineRelationsPart(
  {
    userTable,
    sessionTable,
    accountTable,
    twoFactorTable,
    organizationTable,
    memberTable,
    invitationTable,
    teamTable,
    teamMemberTable,
  },
  (r) => ({
    userTable: {
      sessions: r.many.sessionTable({ alias: 'session_user' }),
      accounts: r.many.accountTable({ alias: 'account_user' }),
      twoFactor: r.one.twoFactorTable({ alias: 'twoFactor_user', optional: true }),
      members: r.many.memberTable({ alias: 'member_user' }),
      teamMembers: r.many.teamMemberTable({ alias: 'teamMember_user' }),
      invitations: r.many.invitationTable({ alias: 'invitation_inviter' }),
    },
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
    accountTable: {
      user: r.one.userTable({
        from: r.accountTable.userId,
        to: r.userTable.id,
        alias: 'account_user',
      }),
    },
    twoFactorTable: {
      user: r.one.userTable({
        from: r.twoFactorTable.userId,
        to: r.userTable.id,
        alias: 'twoFactor_user',
      }),
    },
    organizationTable: {
      members: r.many.memberTable({ alias: 'member_org' }),
      invitations: r.many.invitationTable({ alias: 'invitation_org' }),
      teams: r.many.teamTable({ alias: 'team_org' }),
      activeSessions: r.many.sessionTable({ alias: 'session_active_org' }),
    },
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
