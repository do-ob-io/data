import { defineRelationsPart } from 'drizzle-orm/relations';

import { oauthAccessTokenTable } from '@/schema/auth/oauth-access-token/oauth-access-token-table.js';
import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { oauthRefreshTokenTable } from './oauth-refresh-token-table.js';

/**
 * Relationships for the OAuth refresh token table.
 */
export const oauthRefreshTokenRelations = defineRelationsPart(
  { oauthRefreshTokenTable, oauthClientTable, sessionTable, userTable, oauthAccessTokenTable },
  (r) => ({
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
  }),
);
