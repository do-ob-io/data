import { boolean, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';

export const userFields = {
  ...baseFields,
  email: varchar({ length: 320 }).notNull().unique(),
  emailVerified: boolean().notNull().default(false),
  image: varchar({ length: 2048 }),
  twoFactorEnabled: boolean(),
};
