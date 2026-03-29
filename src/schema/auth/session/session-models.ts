import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { sessionTable } from './session-table.js';

export const sessionModel = createSelectSchema(sessionTable);
export const sessionInsertModel = createInsertSchema(sessionTable);
export const sessionUpdateModel = createUpdateSchema(sessionTable);

export type Session = z.infer<typeof sessionModel>;
export type SessionInsert = z.infer<typeof sessionInsertModel>;
export type SessionUpdate = z.infer<typeof sessionUpdateModel>;
