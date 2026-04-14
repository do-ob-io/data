import { defineRelationsPart } from 'drizzle-orm/relations';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';

import { oauthConsentTable } from './oauth-consent-table.js';

/**
 * Relationships for the OAuth consent table.
 */
export const oauthConsentRelations = defineRelationsPart(
  { oauthConsentTable, oauthClientTable, userTable },
  (r) => ({
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
