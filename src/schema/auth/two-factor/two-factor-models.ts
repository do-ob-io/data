import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { twoFactorTable } from './two-factor-table.js';

export const twoFactorModel = createSelectSchema(twoFactorTable);
export const twoFactorInsertModel = createInsertSchema(twoFactorTable);
export const twoFactorUpdateModel = createUpdateSchema(twoFactorTable);

export type TwoFactor = z.infer<typeof twoFactorModel>;
export type TwoFactorInsert = z.infer<typeof twoFactorInsertModel>;
export type TwoFactorUpdate = z.infer<typeof twoFactorUpdateModel>;
