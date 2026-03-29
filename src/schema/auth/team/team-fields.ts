import { uuid } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';
import { organizationTable } from '@/schema/auth/organization/organization-table.js';

export const teamFields = {
  ...baseFields,
  organizationId: uuid().notNull().references(() => organizationTable.id),
};
