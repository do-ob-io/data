import authSchema from './schema/auth/schema.js';
import worldSchema from './schema/world/schema.js';

export default {
  ...worldSchema,
  ...authSchema,
};
