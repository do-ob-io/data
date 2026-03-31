import { accountTable as authAccountTable } from './account/account-table.js';
import { invitationTable as authInvitationTable } from './invitation/invitation-table.js';
import { memberTable as authMemberTable } from './member/member-table.js';
import { organizationTable as authOrganizationTable } from './organization/organization-table.js';
import { sessionTable as authSessionTable } from './session/session-table.js';
import { teamTable as authTeamTable } from './team/team-table.js';
import { teamMemberTable as authTeamMemberTable } from './team-member/team-member-table.js';
import { twoFactorTable as authTwoFactorTable } from './two-factor/two-factor-table.js';
import { userTable as authUserTable } from './user/user-table.js';
import { verificationTable as authVerificationTable } from './verification/verification-table.js';

export default {
  authUserTable,
  authSessionTable,
  authAccountTable,
  authVerificationTable,
  authTwoFactorTable,
  authOrganizationTable,
  authMemberTable,
  authInvitationTable,
  authTeamTable,
  authTeamMemberTable,
};
