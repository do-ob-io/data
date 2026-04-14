import { getTableName } from 'drizzle-orm';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { OauthRefreshTokenInsert } from './oauth-refresh-token-models.js';
import { oauthRefreshTokenTable } from './oauth-refresh-token-table.js';

describe('auth oauth-refresh-token schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(oauthRefreshTokenTable)).toBe('oauth_refresh_token');
  });

  test('should be able to insert and retrieve a refresh token', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'test-client',
      redirectUris: [ 'https://example.com/cb' ],
    }).returning();

    const tokenInsert: OauthRefreshTokenInsert = {
      token: 'rt_abc123',
      clientId: client.clientId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 86_400_000 * 30),
      createdAt: new Date(),
      scopes: [ 'openid', 'profile' ],
    };

    // Act
    const inserted = await db.insert(oauthRefreshTokenTable).values(tokenInsert).returning();
    const result = await db.query.oauthRefreshTokenTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.token).toBe('rt_abc123');
    expect(result?.scopes).toEqual([ 'openid', 'profile' ]);
  });

  test('should retrieve a refresh token with its user and client', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Jane', email: 'jane@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'jane-client',
      redirectUris: [ 'https://jane.example.com/cb' ],
    }).returning();
    const [ rt ] = await db.insert(oauthRefreshTokenTable).values({
      token: 'rt_jane',
      clientId: client.clientId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 86_400_000),
      createdAt: new Date(),
      scopes: [ 'openid' ],
    }).returning();

    // Act
    const result = await db.query.oauthRefreshTokenTable.findFirst({
      where: { id: rt.id },
      with: { user: true, oauthClient: true },
    });

    // Assert
    expect(result?.user?.email).toBe('jane@example.com');
    expect(result?.oauthClient?.clientId).toBe('jane-client');
  });
});
