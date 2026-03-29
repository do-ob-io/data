import { text, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';

export const organizationFields = {
  ...baseFields,
  slug: varchar({ length: 256 }).notNull().unique(),
  logo: varchar({ length: 2048 }),
  metadata: text(),
};
