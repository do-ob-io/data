import { defineRelationsPart } from 'drizzle-orm/relations';

import { nodeTable } from './node-table.js';

/**
 * Relationships for the node table.
 */
export const nodeRelations = defineRelationsPart({ nodeTable }, (r) => ({
  nodeTable: {
    owner: r.one.nodeTable({
      from: r.nodeTable.ownerId,
      to: r.nodeTable.id,
      optional: true,
      alias: 'node_owner',
    }),
    creator: r.one.nodeTable({
      from: r.nodeTable.creatorId,
      to: r.nodeTable.id,
      optional: true,
      alias: 'node_creator',
    }),
    parent: r.one.nodeTable({
      from: r.nodeTable.parentId,
      to: r.nodeTable.id,
      optional: true,
      alias: 'node_parent',
    }),
    children: r.many.nodeTable({
      alias: 'node_parent',
    }),
    owned: r.many.nodeTable({
      alias: 'node_owner',
    }),
    created: r.many.nodeTable({
      alias: 'node_creator',
    }),
  },
}));
