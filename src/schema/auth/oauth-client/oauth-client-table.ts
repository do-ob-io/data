import { pgTable } from 'drizzle-orm/pg-core';

import { oauthClientFields } from './oauth-client-fields.js';

/**
 * Represents a registered OAuth 2.0 client application.
 */
export const oauthClientTable = pgTable('oauth_client', {
  ...oauthClientFields,
});
