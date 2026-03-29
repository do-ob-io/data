import { defineRelationsPart } from 'drizzle-orm/relations';

import { baseTable } from '@/schema/base/base-table.js';
import { addressTable } from '@/schema/world/address/address-table.js';
import { organizationTable } from '@/schema/world/organization/organization-table.js';

import { personTable } from './person-table.js';

/**
 * Relationships for the person table.
 */
export const personRelations = defineRelationsPart({ personTable, addressTable, baseTable, organizationTable }, (r) => ({
  personTable: {
    base: r.one.baseTable({
      from: r.personTable.id,
      to: r.baseTable.id,
      alias: 'person_base',
    }),
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
