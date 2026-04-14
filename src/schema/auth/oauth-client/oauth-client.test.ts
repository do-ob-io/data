import { getTableName } from 'drizzle-orm';

import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { OauthClientInsert } from './oauth-client-models.js';
import { oauthClientTable } from './oauth-client-table.js';

describe('auth oauth-client schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(oauthClientTable)).toBe('oauth_client');
  });

  test('should be able to insert and retrieve an OAuth client', async ({ db, expect }) => {
    // Arrange
    const clientInsert: OauthClientInsert = {
      clientId: 'my-app-client',
      name: 'My App',
      redirectUris: [ 'https://example.com/callback' ],
    };

    // Act
    const inserted = await db.insert(oauthClientTable).values(clientInsert).returning();
    const result = await db.query.oauthClientTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.clientId).toBe('my-app-client');
    expect(result?.name).toBe('My App');
    expect(result?.redirectUris).toEqual([ 'https://example.com/callback' ]);
  });

  test('should retrieve an OAuth client with its user', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'alice-client',
      userId: user.id,
      redirectUris: [ 'https://alice.example.com/cb' ],
    }).returning();

    // Act
    const result = await db.query.oauthClientTable.findFirst({
      where: { id: client.id },
      with: { user: true },
    });

    // Assert
    expect(result?.user?.email).toBe('alice@example.com');
  });
});
