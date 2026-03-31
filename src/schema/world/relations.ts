import { addressRelations } from './address/address-relations.js';
import { organizationRelations } from './organization/organization-relations.js';
import { personRelations } from './person/person-relations.js';

export default {
  ...addressRelations,
  ...organizationRelations,
  ...personRelations,
};
