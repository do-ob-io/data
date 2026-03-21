import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { addressTable } from './address-table.js';

export const addressModel = createSelectSchema(addressTable);
export const addressInsertModel = createInsertSchema(addressTable, {
  notes: (schema) => schema.trim().max(4096, 'Notes must not exceed 4096 characters').optional(),
});
export const addressUpdateModel = createUpdateSchema(addressTable, {
  notes: (schema) => schema.trim().max(4096, 'Notes must not exceed 4096 characters').optional(),
});

export type Address = z.infer<typeof addressModel>;
export type AddressInsert = z.infer<typeof addressInsertModel>;
export type AddressUpdate = z.infer<typeof addressUpdateModel>;
