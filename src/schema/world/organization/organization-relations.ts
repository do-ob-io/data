import { defineRelationsPart } from 'drizzle-orm/relations';

import { entityTable } from '@/schema/entity/entity-table.js';
import { addressTable } from '@/schema/world/address/address-table.js';

import { organizationTable } from './organization-table.js';

/**
 * Relationships for the organization table.
 */
export const organizationRelations = defineRelationsPart({ organizationTable, addressTable, entityTable }, (r) => ({
  organizationTable: {
    entity: r.one.entityTable({
      from: r.organizationTable.id,
      to: r.entityTable.id,
      alias: 'organization_entity',
    }),
    address: r.one.addressTable({
      from: r.organizationTable.addressId,
      to: r.addressTable.id,
      optional: true,
      alias: 'organization_address',
    }),
  },
}));
