import { defineRelationsPart } from 'drizzle-orm/relations';

import { entityTable } from '../entity/entity-table.js';

import { addressTable } from './address-table.js';

/**
 * Relationships for the address table.
 */
export const addressRelations = defineRelationsPart({ addressTable, entityTable }, (r) => ({
  addressTable: {
    entity: r.one.entityTable({
      from: r.addressTable.id,
      to: r.entityTable.id,
      alias: 'address_entity',
    }),
  },
}));
