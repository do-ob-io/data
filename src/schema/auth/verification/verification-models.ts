import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { verificationTable } from './verification-table.js';

export const verificationModel = createSelectSchema(verificationTable);
export const verificationInsertModel = createInsertSchema(verificationTable);
export const verificationUpdateModel = createUpdateSchema(verificationTable);

export type Verification = z.infer<typeof verificationModel>;
export type VerificationInsert = z.infer<typeof verificationInsertModel>;
export type VerificationUpdate = z.infer<typeof verificationUpdateModel>;
