import { getTableName } from 'drizzle-orm';

import { describe, test } from '@/vitest.fixture.js';

import type { UserInsert } from './user-models.js';
import { userTable } from './user-table.js';

describe('auth user schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(userTable)).toBe('user');
  });

  test('should be able to insert and retrieve a user', async ({ db, expect }) => {
    // Arrange
    const userInsert: UserInsert = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    };

    // Act
    const inserted = await db.insert(userTable).values(userInsert).returning();
    const result = await db.query.userTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(userInsert.name);
    expect(result?.email).toBe(userInsert.email);
    expect(result?.emailVerified).toBe(false);
  });

  test('should retrieve a user with their sessions', async ({ db, expect }) => {
    // Arrange
    const inserted = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();
    const userId = inserted[0].id;

    const { sessionTable } = await import('@/schema/auth/session/session-table.js');

    await db.insert(sessionTable).values({
      userId,
      token: 'tok_abc123',
      expiresAt: new Date(Date.now() + 86_400_000),
    });

    // Act
    const result = await db.query.userTable.findFirst({
      where: { id: userId },
      with: { sessions: true },
    });

    // Assert
    expect(result?.sessions).toHaveLength(1);
    expect(result?.sessions?.[0].token).toBe('tok_abc123');
  });
});
