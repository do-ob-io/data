import { defineRelationsPart } from 'drizzle-orm/relations';

import { addressTable } from './address-table.js';

/**
 * Relationships for the address table.
 */
export const addressRelations = defineRelationsPart({ addressTable }, (_r) => ({}));
