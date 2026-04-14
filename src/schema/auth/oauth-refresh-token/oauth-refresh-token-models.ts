import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { oauthRefreshTokenTable } from './oauth-refresh-token-table.js';

export const oauthRefreshTokenModel = createSelectSchema(oauthRefreshTokenTable);
export const oauthRefreshTokenInsertModel = createInsertSchema(oauthRefreshTokenTable);
export const oauthRefreshTokenUpdateModel = createUpdateSchema(oauthRefreshTokenTable);

export type OauthRefreshToken = z.infer<typeof oauthRefreshTokenModel>;
export type OauthRefreshTokenInsert = z.infer<typeof oauthRefreshTokenInsertModel>;
export type OauthRefreshTokenUpdate = z.infer<typeof oauthRefreshTokenUpdateModel>;
