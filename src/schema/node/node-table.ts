import { pgTable, uuid } from 'drizzle-orm/pg-core';

import { baseFields } from '@/base/base-fields.js';

/**
 * Represents a node entity — a named entity with ownership, authorship, and hierarchical relationships.
 *
 * Extends the base fields with relationship columns for image, owner, creator, and parent associations.
 */
export const nodeTable = pgTable('node', {
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
});
