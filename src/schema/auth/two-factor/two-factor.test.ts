import { getTableName } from 'drizzle-orm';

import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';


import type { TwoFactorInsert } from './two-factor-models.js';
import { twoFactorTable } from './two-factor-table.js';

describe('auth two-factor schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(twoFactorTable)).toBe('auth_two_factor');
  });

  test('should be able to insert and retrieve a two-factor record', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();

    const twoFactorInsert: TwoFactorInsert = {
      userId: user.id,
      secret: 'JBSWY3DPEHPK3PXP',
      backupCodes: JSON.stringify([ 'code1', 'code2', 'code3' ]),
    };

    // Act
    const inserted = await db.insert(twoFactorTable).values(twoFactorInsert).returning();
    const result = await db.query.twoFactorTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.secret).toBe(twoFactorInsert.secret);
    expect(result?.userId).toBe(user.id);
  });

  test('should retrieve a two-factor record with its user', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Jane Doe', email: 'jane@example.com' }).returning();
    const [ tf ] = await db.insert(twoFactorTable).values({
      userId: user.id,
      secret: 'JBSWY3DPEHPK3PXP',
      backupCodes: '[]',
    }).returning();

    // Act
    const result = await db.query.twoFactorTable.findFirst({
      where: { id: tf.id },
      with: { user: true },
    });

    // Assert
    expect(result?.user?.email).toBe('jane@example.com');
  });
});
