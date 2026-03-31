import authRelations from './schema/auth/relations.js';
import { nodeRelations } from './schema/node/node-relations.js';
import worldRelations from './schema/world/relations.js';

export default {
  ...nodeRelations,
  ...worldRelations,
  ...authRelations,
};
