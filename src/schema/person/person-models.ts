import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { entityInsertSchema, entitySelectSchema, entityUpdateSchema } from '@/schema/entity/entity-utils.js';

import { personTable } from './person-table.js';

export const personModel = entitySelectSchema(createSelectSchema(personTable));

export const personInsertModel = entityInsertSchema(createInsertSchema(personTable, {
  bio: (schema) => schema.trim().max(4096, 'Bio must not exceed 4096 characters').optional(),
}));

export const personUpdateModel = entityUpdateSchema(createUpdateSchema(personTable, {
  bio: (schema) => schema.trim().max(4096, 'Bio must not exceed 4096 characters').optional(),
}));

export type Person = z.infer<typeof personModel>;
export type PersonInsert = z.infer<typeof personInsertModel>;
export type PersonUpdate = z.infer<typeof personUpdateModel>;
