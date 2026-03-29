import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { teamMemberTable } from './team-member-table.js';

export const teamMemberModel = createSelectSchema(teamMemberTable);
export const teamMemberInsertModel = createInsertSchema(teamMemberTable);
export const teamMemberUpdateModel = createUpdateSchema(teamMemberTable);

export type TeamMember = z.infer<typeof teamMemberModel>;
export type TeamMemberInsert = z.infer<typeof teamMemberInsertModel>;
export type TeamMemberUpdate = z.infer<typeof teamMemberUpdateModel>;
