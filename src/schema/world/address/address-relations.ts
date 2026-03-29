import { defineRelationsPart } from 'drizzle-orm/relations';

import { baseTable } from '@/schema/base/base-table.js';

import { addressTable } from './address-table.js';

/**
 * Relationships for the address table.
 */
export const addressRelations = defineRelationsPart({ addressTable, baseTable }, (r) => ({
  addressTable: {
    base: r.one.baseTable({
      from: r.addressTable.id,
      to: r.baseTable.id,
      alias: 'address_base',
    }),
  },
}));
