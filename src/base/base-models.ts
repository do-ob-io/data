import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { baseFields } from './base-fields.js';

const _baseTable = pgTable('_base', baseFields);

export const baseModel = createSelectSchema(_baseTable);
export const baseInsertModel = createInsertSchema(_baseTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});
export const baseUpdateModel = createUpdateSchema(_baseTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export type Base = z.infer<typeof baseModel>;
export type BaseInsert = z.infer<typeof baseInsertModel>;
export type BaseUpdate = z.infer<typeof baseUpdateModel>;
