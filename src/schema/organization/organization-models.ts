import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { organizationTable } from './organization-table.js';

export const organizationModel = createSelectSchema(organizationTable);
export const organizationInsertModel = createInsertSchema(organizationTable);
export const organizationUpdateModel = createUpdateSchema(organizationTable);

export type Organization = z.infer<typeof organizationModel>;
export type OrganizationInsert = z.infer<typeof organizationInsertModel>;
export type OrganizationUpdate = z.infer<typeof organizationUpdateModel>;
