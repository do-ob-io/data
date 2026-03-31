import { z } from 'zod';

export const settingsSchema = z.object({
  NODE_ENV: z
    .enum([ 'development', 'production', 'test' ])
    .default('development'),

  /**
   * Database connection settings.
   */
  POSTGRES_HOST: z
    .string()
    .default('localhost'),
  POSTGRES_PORT: z
    .string()
    .refine((val) => {
      const port = Number.parseInt(val, 10);
      return !Number.isNaN(port) && port > 0 && port < 65_536;
    }, {
      message: 'POSTGRES_PORT must be a valid port number',
    })
    .default('5432'),
  POSTGRES_USER: z
    .string()
    .default('postgres'),
  POSTGRES_PASSWORD: z
    .string()
    .default(''),
  POSTGRES_DB: z
    .string()
    .default('postgres'),
});

export type Settings = z.infer<typeof settingsSchema>;

export const SETTINGS = settingsSchema.parse(process.env);
