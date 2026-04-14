import { getTableName } from 'drizzle-orm';

import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';


import type { AccountInsert } from './account-models.js';
import { accountTable } from './account-table.js';

describe('auth account schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(accountTable)).toBe('account');
  });

  test('should be able to insert and retrieve an account', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();

    const accountInsert: AccountInsert = {
      userId: user.id,
      accountId: user.id,
      providerId: 'credential',
    };

    // Act
    const inserted = await db.insert(accountTable).values(accountInsert).returning();
    const result = await db.query.accountTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.providerId).toBe('credential');
    expect(result?.userId).toBe(user.id);
  });

  test('should retrieve an account with its user', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Jane Doe', email: 'jane@example.com' }).returning();
    const [ account ] = await db.insert(accountTable).values({
      userId: user.id,
      accountId: user.id,
      providerId: 'google',
    }).returning();

    // Act
    const result = await db.query.accountTable.findFirst({
      where: { id: account.id },
      with: { user: true },
    });

    // Assert
    expect(result?.user?.email).toBe('jane@example.com');
  });
});
