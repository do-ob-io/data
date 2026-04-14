import { pgTable } from 'drizzle-orm/pg-core';

import { oauthConsentFields } from './oauth-consent-fields.js';

/**
 * Stores user consent decisions for OAuth 2.0 client scope grants.
 */
export const oauthConsentTable = pgTable('oauth_consent', {
  ...oauthConsentFields,
});
