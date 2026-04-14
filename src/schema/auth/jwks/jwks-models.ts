import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { jwksTable } from './jwks-table.js';

export const jwksModel = createSelectSchema(jwksTable);
export const jwksInsertModel = createInsertSchema(jwksTable);
export const jwksUpdateModel = createUpdateSchema(jwksTable);

export type Jwks = z.infer<typeof jwksModel>;
export type JwksInsert = z.infer<typeof jwksInsertModel>;
export type JwksUpdate = z.infer<typeof jwksUpdateModel>;
