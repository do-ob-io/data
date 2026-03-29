import { defineRelationsPart } from 'drizzle-orm/relations';

import { baseTable } from '@/schema/base/base-table.js';
import { addressTable } from '@/schema/world/address/address-table.js';

import { organizationTable } from './organization-table.js';

/**
 * Relationships for the organization table.
 */
export const organizationRelations = defineRelationsPart({ organizationTable, addressTable, baseTable }, (r) => ({
  organizationTable: {
    base: r.one.baseTable({
      from: r.organizationTable.id,
      to: r.baseTable.id,
      alias: 'organization_base',
    }),
    address: r.one.addressTable({
      from: r.organizationTable.addressId,
      to: r.addressTable.id,
      optional: true,
      alias: 'organization_address',
    }),
  },
}));
