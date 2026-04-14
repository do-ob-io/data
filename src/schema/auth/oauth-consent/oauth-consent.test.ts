import { getTableName } from 'drizzle-orm';

import { oauthClientTable } from '@/schema/auth/oauth-client/oauth-client-table.js';
import { userTable } from '@/schema/auth/user/user-table.js';
import { describe, test } from '@/vitest.fixture.js';

import type { OauthConsentInsert } from './oauth-consent-models.js';
import { oauthConsentTable } from './oauth-consent-table.js';

describe('auth oauth-consent schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(oauthConsentTable)).toBe('oauth_consent');
  });

  test('should be able to insert and retrieve a consent record', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Test User', email: 'test@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'test-client',
      redirectUris: [ 'https://example.com/cb' ],
    }).returning();

    const consentInsert: OauthConsentInsert = {
      clientId: client.clientId,
      userId: user.id,
      scopes: [ 'openid', 'profile' ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Act
    const inserted = await db.insert(oauthConsentTable).values(consentInsert).returning();
    const result = await db.query.oauthConsentTable.findFirst({
      where: { id: inserted[0].id },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.scopes).toEqual([ 'openid', 'profile' ]);
  });

  test('should retrieve a consent with its user and client', async ({ db, expect }) => {
    // Arrange
    const [ user ] = await db.insert(userTable).values({ name: 'Alice', email: 'alice@example.com' }).returning();
    const [ client ] = await db.insert(oauthClientTable).values({
      clientId: 'alice-client',
      redirectUris: [ 'https://alice.example.com/cb' ],
    }).returning();
    const [ consent ] = await db.insert(oauthConsentTable).values({
      clientId: client.clientId,
      userId: user.id,
      scopes: [ 'openid' ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // Act
    const result = await db.query.oauthConsentTable.findFirst({
      where: { id: consent.id },
      with: { user: true, oauthClient: true },
    });

    // Assert
    expect(result?.user?.email).toBe('alice@example.com');
    expect(result?.oauthClient?.clientId).toBe('alice-client');
  });
});
