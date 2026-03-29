import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { memberTable } from './member-table.js';

export const memberModel = createSelectSchema(memberTable);
export const memberInsertModel = createInsertSchema(memberTable);
export const memberUpdateModel = createUpdateSchema(memberTable);

export type Member = z.infer<typeof memberModel>;
export type MemberInsert = z.infer<typeof memberInsertModel>;
export type MemberUpdate = z.infer<typeof memberUpdateModel>;
