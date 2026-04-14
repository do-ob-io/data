import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { oauthAccessTokenTable } from './oauth-access-token-table.js';

export const oauthAccessTokenModel = createSelectSchema(oauthAccessTokenTable);
export const oauthAccessTokenInsertModel = createInsertSchema(oauthAccessTokenTable);
export const oauthAccessTokenUpdateModel = createUpdateSchema(oauthAccessTokenTable);

export type OauthAccessToken = z.infer<typeof oauthAccessTokenModel>;
export type OauthAccessTokenInsert = z.infer<typeof oauthAccessTokenInsertModel>;
export type OauthAccessTokenUpdate = z.infer<typeof oauthAccessTokenUpdateModel>;
