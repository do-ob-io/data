import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { invitationTable } from './invitation-table.js';

export const invitationModel = createSelectSchema(invitationTable);
export const invitationInsertModel = createInsertSchema(invitationTable);
export const invitationUpdateModel = createUpdateSchema(invitationTable);

export type Invitation = z.infer<typeof invitationModel>;
export type InvitationInsert = z.infer<typeof invitationInsertModel>;
export type InvitationUpdate = z.infer<typeof invitationUpdateModel>;
