import type { z } from 'zod';

import { baseInsertModel, baseModel, baseUpdateModel } from './base-models';

export function baseSelectSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.extend(baseModel.shape) as z.ZodObject<Z['shape'] & typeof baseModel.shape>;
}

export function baseInsertSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.omit({ id: true }).extend(baseInsertModel.omit({ model: true }).shape) as z.ZodObject<Omit<Z['shape'], 'id'> & Omit<typeof baseInsertModel.shape, 'model'>>;
}

export function baseUpdateSchema<Z extends z.ZodObject>(schema: Z) {
  return schema.omit({ id: true }).extend(baseUpdateModel.omit({ model: true }).shape) as z.ZodObject<Omit<Z['shape'], 'id'> & Omit<typeof baseUpdateModel.shape, 'model'>>;
}
