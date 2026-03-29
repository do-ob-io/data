import { defineRelationsPart } from 'drizzle-orm/relations';

import { addressTable } from '@/schema/world/address/address-table.js';
import { organizationTable } from '@/schema/world/organization/organization-table.js';

import { personTable } from './person-table.js';

/**
 * Relationships for the person table.
 */
export const personRelations = defineRelationsPart({ personTable, addressTable, organizationTable }, (r) => ({
  personTable: {
    organization: r.one.organizationTable({
      from: r.personTable.organizationId,
      to: r.organizationTable.id,
      optional: true,
      alias: 'person_organization',
    }),
    address: r.one.addressTable({
      from: r.personTable.addressId,
      to: r.addressTable.id,
      optional: true,
      alias: 'person_address',
    }),
  },
}));
