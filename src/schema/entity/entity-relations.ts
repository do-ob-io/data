import { defineRelationsPart } from 'drizzle-orm/relations';

import { entityTable } from './entity-table';

/**
 * Relationships for the entity table.
 */
export const entityRelations = defineRelationsPart({ entityTable }, (r) => ({
  entityTable: {
    owner: r.one.entityTable({
      from: r.entityTable.ownerId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_owner',
    }),
    creator: r.one.entityTable({
      from: r.entityTable.creatorId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_creator',
    }),
    parent: r.one.entityTable({
      from: r.entityTable.parentId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_parent',
    }),
    children: r.many.entityTable({
      alias: 'entity_parent',
    }),
    owned: r.many.entityTable({
      alias: 'entity_owner',
    }),
    created: r.many.entityTable({
      alias: 'entity_creator',
    }),
  },
}));
