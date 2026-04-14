import { eq, getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { JwksInsert } from './jwks-models.js';
import { jwksTable } from './jwks-table.js';

describe('auth jwks schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(jwksTable)).toBe('jwks');
  });

  test('should be able to insert and retrieve a JWKS entry', async ({ db, expect }) => {
    // Arrange
    const jwksInsert: JwksInsert = {
      publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjAN...',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIB...',
      createdAt: new Date(),
    };

    // Act
    const inserted = await db.insert(jwksTable).values(jwksInsert).returning();
    const [ result ] = await db.select().from(jwksTable).where(eq(jwksTable.id, inserted[0].id));

    // Assert
    expect(result).toBeDefined();
    expect(result?.publicKey).toBe(jwksInsert.publicKey);
    expect(result?.privateKey).toBe(jwksInsert.privateKey);
  });
});
