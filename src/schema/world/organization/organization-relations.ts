import { defineRelationsPart } from 'drizzle-orm/relations';

import { addressTable } from '@/schema/world/address/address-table.js';

import { organizationTable } from './organization-table.js';

/**
 * Relationships for the organization table.
 */
export const organizationRelations = defineRelationsPart({ organizationTable, addressTable }, (r) => ({
  organizationTable: {
    address: r.one.addressTable({
      from: r.organizationTable.addressId,
      to: r.addressTable.id,
      optional: true,
      alias: 'organization_address',
    }),
  },
}));
