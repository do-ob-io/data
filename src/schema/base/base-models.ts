import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { baseTable } from './base-table.js';

export const baseModel = createSelectSchema(baseTable);
export const baseInsertModel = createInsertSchema(baseTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});
export const baseUpdateModel = createUpdateSchema(baseTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export type Base = z.infer<typeof baseModel>;
export type BaseInsert = z.infer<typeof baseInsertModel>;
export type BaseUpdate = z.infer<typeof baseUpdateModel>;
