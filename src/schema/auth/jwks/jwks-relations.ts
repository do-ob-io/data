import { defineRelationsPart } from 'drizzle-orm/relations';

import { jwksTable } from './jwks-table.js';

/**
 * Relationships for the JWKS table (none — standalone).
 */
export const jwksRelations = defineRelationsPart({ jwksTable }, (_r) => ({}));
