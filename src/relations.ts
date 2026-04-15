import authRelations from './schema/auth/relations.js';
import worldRelations from './schema/world/relations.js';

export default {
  ...worldRelations,
  ...authRelations,
};
