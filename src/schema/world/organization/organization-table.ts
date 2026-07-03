import { pgTable } from 'drizzle-orm/pg-core';

import { TABLE_PREFIX } from '../settings.js';
import { organizationFields } from './organization-fields.js';

/**
 * Represents organization-specific details.
 */
export const organizationTable = pgTable(`${TABLE_PREFIX}_organization`, {
  ...organizationFields,
});
