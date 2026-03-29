import { pgTable } from 'drizzle-orm/pg-core';

import { nodeFields } from './node-fields.js';

/**
 * Represents a node entity — a named entity with ownership, authorship, and hierarchical relationships.
 *
 * Extends the base fields with relationship columns for image, owner, creator, and parent associations.
 */
export const nodeTable = pgTable('node', {
  ...nodeFields,
});
