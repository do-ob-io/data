import { defineRelationsPart } from 'drizzle-orm/relations';

import { accountTable } from '@/schema/auth/account/account-table.js';
import { oauthAccessTokenTable } from '@/schema/auth/oauth-access-token/oauth-access-token-table.js';
import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { oauthConsentTable } from '@/schema/auth/oauth-consent/oauth-consent-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';

import { userTable } from './user-table.js';

/**
 * Relationships for the auth user table.
 */
export const userRelations = defineRelationsPart(
  { userTable, sessionTable, accountTable, oauthClientTable, oauthRefreshTokenTable, oauthAccessTokenTable, oauthConsentTable },
  (r) => ({
    userTable: {
      sessions: r.many.sessionTable({ alias: 'session_user' }),
      accounts: r.many.accountTable({ alias: 'account_user' }),
      oauthClients: r.many.oauthClientTable({ alias: 'oauthClient_user' }),
      oauthRefreshTokens: r.many.oauthRefreshTokenTable({ alias: 'oauthRefreshToken_user' }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_user' }),
      oauthConsents: r.many.oauthConsentTable({ alias: 'oauthConsent_user' }),
    },
  }),
);
