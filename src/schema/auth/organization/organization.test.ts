import { getTableName } from 'drizzle-orm';

import { memberTable } from '@/schema/auth/member/member-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';


import type { OrganizationInsert } from './organization-models.js';
import { organizationTable } from './organization-table.js';

describe('auth organization schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(organizationTable)).toBe('auth_organization');
  });

  test('should be able to insert and retrieve an organization', async ({ db, expect }) => {
    // Arrange
    const orgInsert: OrganizationInsert = {
      name: 'Acme Corp',
      slug: 'acme-corp',
    };

    // Act
    const inserted = await db.insert(organizationTable).values(orgInsert).returning();
    const result = await db.query.organizationTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe(orgInsert.name);
    expect(result?.slug).toBe(orgInsert.slug);
  });

  test('should retrieve an organization with its members', async ({ db, expect }) => {
    // Arrange
    const [ org ] = await db.insert(organizationTable).values({ name: 'Test Org', slug: 'test-org' }).returning();
    const [ user ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    await db.insert(memberTable).values({ userId: user.id, organizationId: org.id, role: 'admin' });

    // Act
    const result = await db.query.organizationTable.findFirst({
      where: { id: org.id },
      with: { members: true },
    });

    // Assert
    expect(result?.members).toHaveLength(1);
    expect(result?.members?.[0].role).toBe('admin');
  });
});
