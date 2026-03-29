import { timestamp, uuid, varchar, text } from 'drizzle-orm/pg-core';

/**
 * Inheritable base column definitions shared across all entity tables.
 *
 * Spread these fields into a `pgTable` definition to inherit common entity columns.
 *
 * @example
 * ```ts
 * export const myTable = pgTable('my_table', {
 *   ...baseFields,
 *   // additional columns...
 * });
 * ```
 */
export const baseFields = {
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
};
