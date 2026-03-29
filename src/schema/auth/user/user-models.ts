import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { userTable } from './user-table.js';

export const userModel = createSelectSchema(userTable);
export const userInsertModel = createInsertSchema(userTable);
export const userUpdateModel = createUpdateSchema(userTable);

export type User = z.infer<typeof userModel>;
export type UserInsert = z.infer<typeof userInsertModel>;
export type UserUpdate = z.infer<typeof userUpdateModel>;
