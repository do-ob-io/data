import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { oauthConsentTable } from './oauth-consent-table.js';

export const oauthConsentModel = createSelectSchema(oauthConsentTable);
export const oauthConsentInsertModel = createInsertSchema(oauthConsentTable);
export const oauthConsentUpdateModel = createUpdateSchema(oauthConsentTable);

export type OauthConsent = z.infer<typeof oauthConsentModel>;
export type OauthConsentInsert = z.infer<typeof oauthConsentInsertModel>;
export type OauthConsentUpdate = z.infer<typeof oauthConsentUpdateModel>;
