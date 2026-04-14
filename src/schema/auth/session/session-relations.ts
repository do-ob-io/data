import { defineRelationsPart } from 'drizzle-orm/relations';

import { oauthAccessTokenTable } from '@/schema/auth/oauth-access-token/oauth-access-token-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { sessionTable } from './session-table.js';

/**
 * Relationships for the auth session table.
 */
export const sessionRelations = defineRelationsPart(
  { sessionTable, userTable, oauthRefreshTokenTable, oauthAccessTokenTable },
  (r) => ({
    sessionTable: {
      user: r.one.userTable({
        from: r.sessionTable.userId,
        to: r.userTable.id,
        alias: 'session_user',
      }),
      oauthRefreshTokens: r.many.oauthRefreshTokenTable({ alias: 'oauthRefreshToken_session' }),
      oauthAccessTokens: r.many.oauthAccessTokenTable({ alias: 'oauthAccessToken_session' }),
    },
  }),
);
