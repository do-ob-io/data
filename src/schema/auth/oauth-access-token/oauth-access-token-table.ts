import { pgTable } from 'drizzle-orm/pg-core';

import { oauthAccessTokenFields } from './oauth-access-token-fields.js';

/**
 * Stores OAuth 2.0 access tokens issued to clients.
 */
export const oauthAccessTokenTable = pgTable('oauth_access_token', {
  ...oauthAccessTokenFields,
});
