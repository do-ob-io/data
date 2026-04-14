import { defineRelationsPart } from 'drizzle-orm/relations';

import { accountTable } from './account/account-table.js';
import { jwksTable } from './jwks/jwks-table.js';
import { oauthAccessTokenTable } from './oauth-access-token/oauth-access-token-table.js';
import { oauthClientTable } from './oauth-client/oauth-client-table.js';
import { oauthConsentTable } from './oauth-consent/oauth-consent-table.js';
import { oauthRefreshTokenTable } from './oauth-refresh-token/oauth-refresh-token-table.js';
import { sessionTable } from './session/session-table.js';
import { userTable } from './user/user-table.js';
import { verificationTable } from './verification/verification-table.js';

/**
 * All auth schema relationships defined in a single part so that every
 * `r.many` is paired with its reverse `r.one` (with `from`/`to`) in the same
 * `defineRelationsPart` call, as required by Drizzle ORM v2 beta.
 */
export default defineRelationsPart(
  {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
    jwksTable,
    oauthClientTable,
    oauthRefreshTokenTable,
    oauthAccessTokenTable,
    oauthConsentTable,
  },
  (r) => ({
    userTable: {
      sessions: r.many.sessionTable({ alias: 'session_user' }),
      accounts: r.many.accountTable({ alias: 'account_user' }),
      oauthClients: r.many.oauthClientTable({ alias: 'oauthClient_user' }),
      oauthRefreshTokens: r.many.oauthRefreshTokenTable({ alias: 'oauthRefreshToken_user' }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_user' }),
      oauthConsents: r.many.oauthConsentTable({ alias: 'oauthConsent_user' }),
    },
    sessionTable: {
      user: r.one.userTable({
        from: r.sessionTable.userId,
        to: r.userTable.id,
        alias: 'session_user',
      }),
      oauthRefreshTokens: r.many.oauthRefreshTokenTable({ alias: 'oauthRefreshToken_session' }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_session' }),
    },
    accountTable: {
      user: r.one.userTable({
        from: r.accountTable.userId,
        to: r.userTable.id,
        alias: 'account_user',
      }),
    },
    oauthClientTable: {
      user: r.one.userTable({
        from: r.oauthClientTable.userId,
        to: r.userTable.id,
        optional: true,
        alias: 'oauthClient_user',
      }),
      oauthRefreshTokens: r.many.oauthRefreshTokenTable({ alias: 'oauthRefreshToken_client' }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_client' }),
      oauthConsents: r.many.oauthConsentTable({ alias: 'oauthConsent_client' }),
    },
    oauthRefreshTokenTable: {
      oauthClient: r.one.oauthClientTable({
        from: r.oauthRefreshTokenTable.clientId,
        to: r.oauthClientTable.clientId,
        alias: 'oauthRefreshToken_client',
      }),
      session: r.one.sessionTable({
        from: r.oauthRefreshTokenTable.sessionId,
        to: r.sessionTable.id,
        optional: true,
        alias: 'oauthRefreshToken_session',
      }),
      user: r.one.userTable({
        from: r.oauthRefreshTokenTable.userId,
        to: r.userTable.id,
        alias: 'oauthRefreshToken_user',
      }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_refresh' }),
    },
    oauthAccessTokenTable: {
      oauthClient: r.one.oauthClientTable({
        from: r.oauthAccessTokenTable.clientId,
        to: r.oauthClientTable.clientId,
        alias: 'oauthAccessToken_client',
      }),
      session: r.one.sessionTable({
        from: r.oauthAccessTokenTable.sessionId,
        to: r.sessionTable.id,
        optional: true,
        alias: 'oauthAccessToken_session',
      }),
      user: r.one.userTable({
        from: r.oauthAccessTokenTable.userId,
        to: r.userTable.id,
        optional: true,
        alias: 'oauthAccessToken_user',
      }),
      oauthRefreshToken: r.one.oauthRefreshTokenTable({
        from: r.oauthAccessTokenTable.refreshId,
        to: r.oauthRefreshTokenTable.id,
        optional: true,
        alias: 'oauthAccessToken_refresh',
      }),
    },
    oauthConsentTable: {
      oauthClient: r.one.oauthClientTable({
        from: r.oauthConsentTable.clientId,
        to: r.oauthClientTable.clientId,
        alias: 'oauthConsent_client',
      }),
      user: r.one.userTable({
        from: r.oauthConsentTable.userId,
        to: r.userTable.id,
        optional: true,
        alias: 'oauthConsent_user',
      }),
    },
  }),
);
