import { accountTable as authAccountTable } from './account/account-table.js';
import { jwksTable as authJwksTable } from './jwks/jwks-table.js';
import { oauthAccessTokenTable as authOauthAccessTokenTable } from './oauth-access-token/oauth-access-token-table.js';
import { oauthClientTable as authOauthClientTable } from './oauth-client/oauth-client-table.js';
import { oauthConsentTable as authOauthConsentTable } from './oauth-consent/oauth-consent-table.js';
import { oauthRefreshTokenTable as authOauthRefreshTokenTable } from './oauth-refresh-token/oauth-refresh-token-table.js';
import { sessionTable as authSessionTable } from './session/session-table.js';
import { userTable as authUserTable } from './user/user-table.js';
import { verificationTable as authVerificationTable } from './verification/verification-table.js';

export default {
  authUserTable,
  authSessionTable,
  authAccountTable,
  authVerificationTable,
  authJwksTable,
  authOauthClientTable,
  authOauthRefreshTokenTable,
  authOauthAccessTokenTable,
  authOauthConsentTable,
};
