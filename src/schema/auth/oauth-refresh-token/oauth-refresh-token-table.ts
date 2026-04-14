import { pgTable } from 'drizzle-orm/pg-core';

import { oauthRefreshTokenFields } from './oauth-refresh-token-fields.js';

/**
 * Stores OAuth 2.0 refresh tokens issued to clients.
 */
export const oauthRefreshTokenTable = pgTable('oauth_refresh_token', {
  ...oauthRefreshTokenFields,
});
