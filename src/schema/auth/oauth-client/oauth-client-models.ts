import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { oauthClientTable } from './oauth-client-table.js';

export const oauthClientModel = createSelectSchema(oauthClientTable);
export const oauthClientInsertModel = createInsertSchema(oauthClientTable);
export const oauthClientUpdateModel = createUpdateSchema(oauthClientTable);

export type OauthClient = z.infer<typeof oauthClientModel>;
export type OauthClientInsert = z.infer<typeof oauthClientInsertModel>;
export type OauthClientUpdate = z.infer<typeof oauthClientUpdateModel>;
