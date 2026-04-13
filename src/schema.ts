import authSchema from './schema/auth/schema.js';
import nodeSchema from './schema/node/schema.js';
import worldSchema from './schema/world/schema.js';

export default {
  ...nodeSchema,
  ...worldSchema,
  ...authSchema,
};
