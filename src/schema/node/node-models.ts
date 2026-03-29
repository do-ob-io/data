import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { nodeTable } from './node-table.js';

export const nodeModel = createSelectSchema(nodeTable);
export const nodeInsertModel = createInsertSchema(nodeTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});
export const nodeUpdateModel = createUpdateSchema(nodeTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export type Node = z.infer<typeof nodeModel>;
export type NodeInsert = z.infer<typeof nodeInsertModel>;
export type NodeUpdate = z.infer<typeof nodeUpdateModel>;
