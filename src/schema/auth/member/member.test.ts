import { getTableName } from 'drizzle-orm';


import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { MemberInsert } from './member-models.js';
import { memberTable } from './member-table.js';

describe('auth member schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(memberTable)).toBe('auth_member');
  });

  test('should be able to insert and retrieve a member', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'Acme', slug: 'acme' }).returning();

    const memberInsert: MemberInsert = {
      userId: user.id,
      organizationId: org.id,
      role: 'member',
    };

    // Act
    const inserted = await db.insert(memberTable).values(memberInsert).returning();
    const result = await db.query.memberTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.role).toBe('member');
    expect(result?.userId).toBe(user.id);
  });

  test('should retrieve a member with its user and organization', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Bob', email: 'bob@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'BobCo', slug: 'bobco' }).returning();
    const [ member ] = await db.insert(memberTable).values({ userId: user.id, organizationId: org.id, role: 'owner' }).returning();

    // Act
    const result = await db.query.memberTable.findFirst({
      where: { id: member.id },
      with: { user: true, organization: true },
    });

    // Assert
    expect(result?.user?.email).toBe('bob@example.com');
    expect(result?.organization?.slug).toBe('bobco');
  });
});
