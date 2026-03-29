import { defineRelationsPart } from 'drizzle-orm/relations';

import { verificationTable } from './verification-table.js';

/**
 * Relationships for the auth verification table.
 */
export const verificationRelations = defineRelationsPart({ verificationTable }, (_r) => ({}));
