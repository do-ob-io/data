import { nodeRelations } from './schema/node/node-relations.js';
import { addressRelations } from './schema/world/address/address-relations.js';
import { organizationRelations } from './schema/world/organization/organization-relations.js';
import { personRelations } from './schema/world/person/person-relations.js';

export default {
  ...nodeRelations,
  ...addressRelations,
  ...organizationRelations,
  ...personRelations,
};
