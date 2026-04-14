import { boolean, jsonb, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { userTable } from '@/schema/auth/user/user-table.js';

export const oauthClientFields = {
  /** Unique identifier for the OAuth client record. */
  id: uuid('id').primaryKey().defaultRandom(),

  /** Public client identifier used in OAuth flows; must be unique. */
  clientId: varchar('client_id', { length: 256 }).notNull().unique(),

  /** Client secret for confidential clients. */
  clientSecret: text('client_secret'),

  /** Whether the client is disabled. */
  disabled: boolean('disabled').default(false),

  /** Whether to skip the user consent screen. */
  skipConsent: boolean('skip_consent'),

  /** Whether end-session (logout) is enabled for this client. */
  enableEndSession: boolean('enable_end_session'),

  /** Subject type for ID tokens (e.g. "public", "pairwise"). */
  subjectType: varchar('subject_type', { length: 64 }),

  /** OAuth scopes this client is allowed to request. */
  scopes: text('scopes').array(),

  /** Optional owner user for this OAuth client. */
  userId: uuid('user_id').references(() => userTable.id, { onDelete: 'cascade' }),

  /** Timestamp when the client was created. */
  createdAt: timestamp('created_at', { withTimezone: true }),

  /** Timestamp when the client was last updated. */
  updatedAt: timestamp('updated_at', { withTimezone: true }),

  /** Human-readable name of the client application. */
  name: varchar('name', { length: 256 }),

  /** URI of the client application homepage. */
  uri: varchar('uri', { length: 2048 }),

  /** URL to the client application icon. */
  icon: varchar('icon', { length: 2048 }),

  /** Contact email addresses for the client. */
  contacts: text('contacts').array(),

  /** URL to the client's terms of service. */
  tos: varchar('tos', { length: 2048 }),

  /** URL to the client's privacy policy. */
  policy: varchar('policy', { length: 2048 }),

  /** Software identifier for the client. */
  softwareId: varchar('software_id', { length: 256 }),

  /** Software version of the client. */
  softwareVersion: varchar('software_version', { length: 64 }),

  /** Software statement assertion (JWT) for the client. */
  softwareStatement: text('software_statement'),

  /** Allowed redirect URIs for OAuth callbacks. */
  redirectUris: text('redirect_uris').array().notNull(),

  /** URIs to redirect to after logout. */
  postLogoutRedirectUris: text('post_logout_redirect_uris').array(),

  /** Token endpoint authentication method (e.g. "client_secret_post"). */
  tokenEndpointAuthMethod: varchar('token_endpoint_auth_method', { length: 64 }),

  /** Allowed OAuth grant types (e.g. "authorization_code", "refresh_token"). */
  grantTypes: text('grant_types').array(),

  /** Allowed OAuth response types (e.g. "code", "token"). */
  responseTypes: text('response_types').array(),

  /** Whether this is a public client (no client secret required). */
  public: boolean('public'),

  /** Client type classification. */
  type: varchar('type', { length: 64 }),

  /** Whether PKCE is required for this client. */
  requirePKCE: boolean('require_pkce'),

  /** External reference identifier for cross-system linking. */
  referenceId: varchar('reference_id', { length: 256 }),

  /** Arbitrary metadata stored as JSON. */
  metadata: jsonb('metadata'),
};
