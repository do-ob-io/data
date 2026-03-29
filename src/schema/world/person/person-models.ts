import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { personTable } from './person-table.js';

export const personModel = createSelectSchema(personTable);

export const personInsertModel = createInsertSchema(personTable, {
  bio: (schema) => schema.trim().max(4096, 'Bio must not exceed 4096 characters').optional(),
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export const personUpdateModel = createUpdateSchema(personTable, {
  bio: (schema) => schema.trim().max(4096, 'Bio must not exceed 4096 characters').optional(),
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters').optional(),
});

export type Person = z.infer<typeof personModel>;
export type PersonInsert = z.infer<typeof personInsertModel>;
export type PersonUpdate = z.infer<typeof personUpdateModel>;
