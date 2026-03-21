import { addressRelations } from './schema/address/address-relations.js';
import { entityRelations } from './schema/entity/entity-relations.js';
import { organizationRelations } from './schema/organization/organization-relations.js';
import { personRelations } from './schema/person/person-relations.js';

export default {
  ...addressRelations,
  ...entityRelations,
  ...organizationRelations,
  ...personRelations,
};
