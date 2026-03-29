import { defineRelationsPart } from 'drizzle-orm/relations';

import { baseTable } from './base-table';

/**
 * Relationships for the base table.
 */
export const baseRelations = defineRelationsPart({ baseTable }, (r) => ({
  baseTable: {
    owner: r.one.baseTable({
      from: r.baseTable.ownerId,
      to: r.baseTable.id,
      optional: true,
      alias: 'base_owner',
    }),
    creator: r.one.baseTable({
      from: r.baseTable.creatorId,
      to: r.baseTable.id,
      optional: true,
      alias: 'base_creator',
    }),
    parent: r.one.baseTable({
      from: r.baseTable.parentId,
      to: r.baseTable.id,
      optional: true,
      alias: 'base_parent',
    }),
    children: r.many.baseTable({
      alias: 'base_parent',
    }),
    owned: r.many.baseTable({
      alias: 'base_owner',
    }),
    created: r.many.baseTable({
      alias: 'base_creator',
    }),
  },
}));
