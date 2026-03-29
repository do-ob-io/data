import { eq, getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { VerificationInsert } from './verification-models.js';
import { verificationTable } from './verification-table.js';

describe('auth verification schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(verificationTable)).toBe('auth_verification');
  });

  test('should be able to insert and retrieve a verification token', async ({ db, expect }) => {
    // Arrange
    const verificationInsert: VerificationInsert = {
      identifier: 'ada@example.com',
      value: 'tok_verify_abc',
      expiresAt: new Date(Date.now() + 3_600_000),
    };

    // Act
    const inserted = await db.insert(verificationTable).values(verificationInsert).returning();
    const [ result ] = await db.select().from(verificationTable).where(eq(verificationTable.id, inserted[0].id));

    // Assert
    expect(result).toBeDefined();
    expect(result?.identifier).toBe(verificationInsert.identifier);
    expect(result?.value).toBe(verificationInsert.value);
  });
});
