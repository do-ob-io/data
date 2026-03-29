import { uuid } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';

/**
 * Inheritable node column definitions that extend base fields with relationship columns.
 *
 * @example
 * ```ts
 * export const myTable = pgTable('my_table', {
 *   ...nodeFields,
 *   // additional columns...
 * });
 * ```
 */
export const nodeFields = {
  ...baseFields,

  /**
   * A reference to an optional image associated with the entity.
   */
  imageId: uuid(),

  /**
   * The unique identifier that references the owner of the entity.
   *
   * A null value indicates that the entity is owned by the system.
   */
  ownerId: uuid(),

  /**
   * The unique identifier that references the creator of the entity.
   *
   * A null value indicates that the entity was created by the system.
   */
  creatorId: uuid(),

  /**
   * The unique identifier that references the parent of the entity.
   *
   * A null value indicates that the entity does not have a parent or is a top-level entity.
   */
  parentId: uuid(),
};
