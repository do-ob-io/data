import { getTableName } from 'drizzle-orm';

import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';


import type { SessionInsert } from './session-models.js';
import { sessionTable } from './session-table.js';

describe('auth session schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(sessionTable)).toBe('auth_session');
  });

  test('should be able to insert and retrieve a session', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();

    const sessionInsert: SessionInsert = {
      userId: user.id,
      token: 'tok_test123',
      expiresAt: new Date(Date.now() + 86_400_000),
    };

    // Act
    const inserted = await db.insert(sessionTable).values(sessionInsert).returning();
    const result = await db.query.sessionTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.token).toBe(sessionInsert.token);
    expect(result?.userId).toBe(user.id);
  });

  test('should retrieve a session with its user', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Jane Doe', email: 'jane@example.com' }).returning();
    await db.insert(sessionTable).values({ userId: user.id, token: 'tok_relation', expiresAt: new Date(Date.now() + 86_400_000) });

    // Act
    const [ session ] = await db.insert(sessionTable).values({
      userId: user.id,
      token: 'tok_with_user',
      expiresAt: new Date(Date.now() + 86_400_000),
    }).returning();

    const result = await db.query.sessionTable.findFirst({
      where: { id: session.id },
      with: { user: true },
    });

    // Assert
    expect(result?.user).toBeDefined();
    expect(result?.user?.email).toBe('jane@example.com');
  });
});
