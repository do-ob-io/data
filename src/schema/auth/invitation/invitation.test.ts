import { getTableName } from 'drizzle-orm';


import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { InvitationInsert } from './invitation-models.js';
import { invitationTable } from './invitation-table.js';

describe('auth invitation schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(invitationTable)).toBe('auth_invitation');
  });

  test('should be able to insert and retrieve an invitation', async ({ db, expect }) => {
    // Arrange
    const [ inviter ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'Acme', slug: 'acme' }).returning();

    const invitationInsert: InvitationInsert = {
      email: 'bob@example.com',
      inviterId: inviter.id,
      organizationId: org.id,
      role: 'member',
      expiresAt: new Date(Date.now() + 86_400_000 * 7),
    };

    // Act
    const inserted = await db.insert(invitationTable).values(invitationInsert).returning();
    const result = await db.query.invitationTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.email).toBe('bob@example.com');
    expect(result?.status).toBe('pending');
  });

  test('should retrieve an invitation with its inviter and organization', async ({ db, expect }) => {
    // Arrange
    const [ inviter ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice2@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'TestOrg', slug: 'testorg' }).returning();

    const [ invitation ] = await db.insert(invitationTable).values({
      email: 'newmember@example.com',
      inviterId: inviter.id,
      organizationId: org.id,
      expiresAt: new Date(Date.now() + 86_400_000),
    }).returning();

    // Act
    const result = await db.query.invitationTable.findFirst({
      where: { id: invitation.id },
      with: { inviter: true, organization: true },
    });

    // Assert
    expect(result?.inviter?.email).toBe('alice2@example.com');
    expect(result?.organization?.slug).toBe('testorg');
  });
});
