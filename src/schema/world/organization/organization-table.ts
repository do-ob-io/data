import { pgTable } from 'drizzle-orm/pg-core';

import { organizationFields } from './organization-fields.js';

/**
 * Represents organization-specific details.
 */
export const organizationTable = pgTable('organization', {
  ...organizationFields,
});
