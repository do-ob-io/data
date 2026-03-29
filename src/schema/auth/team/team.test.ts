import { getTableName } from 'drizzle-orm';


import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { teamMemberTable } from '@/schema/auth/team-member/team-member-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { TeamInsert } from './team-models.js';
import { teamTable } from './team-table.js';

describe('auth team schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(teamTable)).toBe('auth_team');
  });

  test('should be able to insert and retrieve a team', async ({ db, expect }) => {
    // Arrange
    const [ org ] = await db.insert(organizationTable).values({ name: 'Acme', slug: 'acme' }).returning();

    const teamInsert: TeamInsert = {
      name: 'Engineering',
      organizationId: org.id,
    };

    // Act
    const inserted = await db.insert(teamTable).values(teamInsert).returning();
    const result = await db.query.teamTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.name).toBe('Engineering');
    expect(result?.organizationId).toBe(org.id);
  });

  test('should retrieve a team with its organization and members', async ({ db, expect }) => {
    // Arrange
    const [ org ] = await db.insert(organizationTable).values({ name: 'BobCo', slug: 'bobco' }).returning();
    const [ user ] = await db.insert(userTable).values({ name: 'Bob', email: 'bob@example.com' }).returning();
    const [ team ] = await db.insert(teamTable).values({ name: 'Design', organizationId: org.id }).returning();
    await db.insert(teamMemberTable).values({ teamId: team.id, userId: user.id });

    // Act
    const result = await db.query.teamTable.findFirst({
      where: { id: team.id },
      with: { organization: true, members: true },
    });

    // Assert
    expect(result?.organization?.slug).toBe('bobco');
    expect(result?.members).toHaveLength(1);
  });
});
