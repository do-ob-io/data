import { getTableName } from 'drizzle-orm';


import { organizationTable } from '@/schema/auth/organization/organization-table.js';
import { teamTable } from '@/schema/auth/team/team-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { TeamMemberInsert } from './team-member-models.js';
import { teamMemberTable } from './team-member-table.js';

describe('auth team-member schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(teamMemberTable)).toBe('auth_team_member');
  });

  test('should be able to insert and retrieve a team member', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'Acme', slug: 'acme' }).returning();
    const [ team ] = await db.insert(teamTable).values({ name: 'Eng', organizationId: org.id }).returning();

    const teamMemberInsert: TeamMemberInsert = {
      teamId: team.id,
      userId: user.id,
    };

    // Act
    const inserted = await db.insert(teamMemberTable).values(teamMemberInsert).returning();
    const result = await db.query.teamMemberTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.userId).toBe(user.id);
    expect(result?.teamId).toBe(team.id);
  });

  test('should retrieve a team member with its team and user', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Bob', email: 'bob@example.com' }).returning();
    const [ org ] = await db.insert(organizationTable).values({ name: 'BobCo', slug: 'bobco' }).returning();
    const [ team ] = await db.insert(teamTable).values({ name: 'Design', organizationId: org.id }).returning();
    const [ tm ] = await db.insert(teamMemberTable).values({ teamId: team.id, userId: user.id }).returning();

    // Act
    const result = await db.query.teamMemberTable.findFirst({
      where: { id: tm.id },
      with: { team: true, user: true },
    });

    // Assert
    expect(result?.team?.name).toBe('Design');
    expect(result?.user?.email).toBe('bob@example.com');
  });
});
