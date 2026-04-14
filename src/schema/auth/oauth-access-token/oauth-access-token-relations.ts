import { defineRelationsPart } from 'drizzle-orm/relations';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { sessionTable } from '@/schema/auth/session/session-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { oauthAccessTokenTable } from './oauth-access-token-table.js';

/**
 * Relationships for the OAuth access token table.
 */
export const oauthAccessTokenRelations = defineRelationsPart(
  { oauthAccessTokenTable, oauthClientTable, sessionTable, userTable, oauthRefreshTokenTable },
  (r) => ({
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
  }),
);
