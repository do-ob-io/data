import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Represents an abstract table with common crucial properties.
 */
export const entityTable = pgTable('entity', {
  /**
   * The unique identifier for the entity.
   */
  id: uuid().primaryKey().defaultRandom(),

  /**
   * The name of the entity.
   */
  name: varchar({ length: 256 }).notNull(),

  /**
   * An alternate alias of the entity.
   */
  alias: varchar({ length: 256 }),

  /**
   * A string that defines the data model this abstraction belongs to, used for polymorphic associations.
   *
   * This should match the name of the model that this entity represents, such as 'entity', 'user', 'project', etc.
   */
  model: varchar({ length: 256 }).notNull(),

  /**
   * A brief description of the entity.
   */
  description: text(),

  /**
   * A possible URL that relates to the entity, such as a link to an external resource or reference documentation.
   */
  url: varchar({ length: 2048 }),

  /**
   * The date and time when the entity was created.
   */
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  /**
   * The date and time when the entity was last updated.
   */
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),

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
