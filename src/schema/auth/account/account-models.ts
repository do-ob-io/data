import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { accountTable } from './account-table.js';

export const accountModel = createSelectSchema(accountTable);
export const accountInsertModel = createInsertSchema(accountTable);
export const accountUpdateModel = createUpdateSchema(accountTable);

export type Account = z.infer<typeof accountModel>;
export type AccountInsert = z.infer<typeof accountInsertModel>;
export type AccountUpdate = z.infer<typeof accountUpdateModel>;
