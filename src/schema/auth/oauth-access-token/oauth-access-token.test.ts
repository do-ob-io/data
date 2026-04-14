import { getTableName } from 'drizzle-orm';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { oauthRefreshTokenTable } from '@/schema/auth/oauth-refresh-token/oauth-refresh-token-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { OauthAccessTokenInsert } from './oauth-access-token-models.js';
import { oauthAccessTokenTable } from './oauth-access-token-table.js';

describe('auth oauth-access-token schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(oauthAccessTokenTable)).toBe('oauth_access_token');
  });

  test('should be able to insert and retrieve an access token', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'test-client',
      redirectUris: [ 'https://example.com/cb' ],
    }).returning();

    const tokenInsert: OauthAccessTokenInsert = {
      token: 'at_abc123',
      clientId: client.clientId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 3_600_000),
      createdAt: new Date(),
      scopes: [ 'openid', 'profile' ],
    };

    // Act
    const inserted = await db.insert(oauthAccessTokenTable).values(tokenInsert).returning();
    const result = await db.query.oauthAccessTokenTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.token).toBe('at_abc123');
    expect(result?.scopes).toEqual([ 'openid', 'profile' ]);
  });

  test('should retrieve an access token with its refresh token', async ({ db, expect }) => {
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
    const [ at ] = await db.insert(oauthAccessTokenTable).values({
      token: 'at_jane',
      clientId: client.clientId,
      userId: user.id,
      refreshId: rt.id,
      expiresAt: new Date(Date.now() + 3_600_000),
      createdAt: new Date(),
      scopes: [ 'openid' ],
    }).returning();

    // Act
    const result = await db.query.oauthAccessTokenTable.findFirst({
      where: { id: at.id },
      with: { oauthRefreshToken: true, oauthClient: true },
    });

    // Assert
    expect(result?.oauthRefreshToken?.token).toBe('rt_jane');
    expect(result?.oauthClient?.clientId).toBe('jane-client');
  });
});
