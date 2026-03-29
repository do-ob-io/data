import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite';

// import relations from './relations.js';
// import * as schema from './schema.js';

/**
 * An in-memory PostgreSQL database instance powered by PGlite.
 */
export const db: PgliteDatabase = drizzle('memory://');
