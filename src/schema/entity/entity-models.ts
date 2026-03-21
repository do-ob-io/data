import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { entityTable } from './entity-table.js';

export const entityModel = createSelectSchema(entityTable);
export const entityInsertModel = createInsertSchema(entityTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});
export const entityUpdateModel = createUpdateSchema(entityTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export type Entity = z.infer<typeof entityModel>;
export type EntityInsert = z.infer<typeof entityInsertModel>;
export type EntityUpdate = z.infer<typeof entityUpdateModel>;
