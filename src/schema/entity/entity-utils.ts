import type { z } from 'zod';

import { entityInsertModel, entityModel, entityUpdateModel } from './entity-models';

export function entitySelectSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.extend(entityModel.shape) as z.ZodObject<Z['shape'] & typeof entityModel.shape>;
}

export function entityInsertSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.omit({ id: true }).extend(entityInsertModel.shape) as z.ZodObject<Omit<Z['shape'], 'id'> & typeof entityInsertModel.shape>;
}

export function entityUpdateSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.omit({ id: true }).extend(entityUpdateModel.shape) as z.ZodObject<Omit<Z['shape'], 'id'> & typeof entityUpdateModel.shape>;
}
