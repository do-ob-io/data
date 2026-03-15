import { defineRelations } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type { z } from 'zod';

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
   * A string that defines the table model this abstraction belongs to, used for polymorphic associations.
   */
  model: varchar({ length: 256 }).notNull(),

  /**
   * A brief description of the entity.
   */
  description: text(),

  /**
   * The date and time when the entity was created.
   */
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  /**
   * The date and time when the entity was last updated.
   */
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),

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

/**
 * Defines the relationships for the entity table.
 *
 * - `owner`: The entity that owns this entity (self-referencing via `ownerId`).
 * - `creator`: The entity that created this entity (self-referencing via `creatorId`).
 * - `parent`: The parent entity in a hierarchy (self-referencing via `parentId`).
 * - `children`: All entities that have this entity as their parent.
 * - `owned`: All entities owned by this entity.
 * - `created`: All entities created by this entity.
 */
export const entityRelations = defineRelations({ entityTable }, (r) => ({
  entityTable: {
    owner: r.one.entityTable({
      from: r.entityTable.ownerId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_owner',
    }),
    creator: r.one.entityTable({
      from: r.entityTable.creatorId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_creator',
    }),
    parent: r.one.entityTable({
      from: r.entityTable.parentId,
      to: r.entityTable.id,
      optional: true,
      alias: 'entity_parent',
    }),
    children: r.many.entityTable({
      alias: 'entity_parent',
    }),
    owned: r.many.entityTable({
      alias: 'entity_owner',
    }),
    created: r.many.entityTable({
      alias: 'entity_creator',
    }),
  },
}));

export const entitySchema = createSelectSchema(entityTable);
export const entityInsertSchema = createInsertSchema(entityTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters'),
});
export const entityUpdateSchema = createUpdateSchema(entityTable, {
  description: (schema) => schema.trim().max(4096, 'Description must not exceed 4096 characters'),
});

export type Entity = z.infer<typeof entitySchema>;
export type EntityInsert = z.infer<typeof entityInsertSchema>;
export type EntityUpdate = z.infer<typeof entityUpdateSchema>;
