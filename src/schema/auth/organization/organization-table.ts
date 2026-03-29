import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';

import { organizationFields } from './organization-fields.js';

/**
 * Represents a multi-tenant organization (workspace/tenant) used for access control.
 */
export const organizationTable = pgTable(`${TABLE_PREFIX}_organization`, {
  ...organizationFields,
});
