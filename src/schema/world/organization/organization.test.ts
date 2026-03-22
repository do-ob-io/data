import { getTableName } from 'drizzle-orm';

import type { EntityInsert } from '@/schema/entity/index.js';
import { entityTable } from '@/schema/entity/index.js';
import { describe, test } from '@/vitest.fixture.js';

import type { OrganizationInsert } from './organization-models.js';
import { organizationTable } from './organization-table.js';

describe('organization schema', () => {

  test('should have the correct table name', async ({ expect }) => {
    expect(getTableName(organizationTable)).toBe('organization');
  });

  test('should be able to insert and retrieve an organization', async ({ db, expect }) => {
    // Arrange
    const entityInsert: EntityInsert = {
      name: 'Example Organization',
      description: 'Test organization entity.',
      model: 'organization',
    };
    const insertedEntity = await db.insert(entityTable).values(entityInsert).returning();

    const organizationInsert: OrganizationInsert = {
      id: insertedEntity[0].id,
      legal: 'Example Organization LLC',
      tax: 'TAX-123',
      email: 'hello@example.org',
      phone: '+1-555-0100',
      url: 'https://example.org',
      industry: 'Technology',
    };

    // Act
    await db.insert(organizationTable).values(organizationInsert).returning();
    const result = await db.query.organizationTable.findFirst({
      where: {
        id: organizationInsert.id,
      },
      with: {
        entity: true,
      },
    });

    // Assert
    expect(result).toBeDefined();
    expect(result?.legal).toBe(organizationInsert.legal);
    expect(result?.tax).toBe(organizationInsert.tax);
    expect(result?.email).toBe(organizationInsert.email);
    expect(result?.phone).toBe(organizationInsert.phone);
    expect(result?.url).toBe(organizationInsert.url);
    expect(result?.industry).toBe(organizationInsert.industry);
    expect(result?.entity?.id).toBe(organizationInsert.id);
    expect(result?.entity?.name).toBe(entityInsert.name);
  });
});
