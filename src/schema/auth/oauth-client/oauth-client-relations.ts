import { defineRelationsPart } from 'drizzle-orm/relations';

import { oauthAccessTokenTable } from '@/schema/auth/oauth-access-token/oauth-access-token-table.js';
import { oauthConsentTable } from '@/schema/auth/oauth-consent/oauth-consent-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { oauthClientTable } from './oauth-client-table.js';

/**
 * Relationships for the OAuth client table.
 */
export const oauthClientRelations = defineRelationsPart(
  { oauthClientTable, userTable, oauthRefreshTokenTable, oauthAccessTokenTable, oauthConsentTable },
  (r) => ({
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
  }),
);
