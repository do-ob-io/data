import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

import { teamTable } from './team-table.js';

export const teamModel = createSelectSchema(teamTable);
export const teamInsertModel = createInsertSchema(teamTable);
export const teamUpdateModel = createUpdateSchema(teamTable);

export type Team = z.infer<typeof teamModel>;
export type TeamInsert = z.infer<typeof teamInsertModel>;
export type TeamUpdate = z.infer<typeof teamUpdateModel>;
