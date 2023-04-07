// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { seedTable } from './seed/lib/dbUtils';
import { createForeignKeyListTransformer } from './seed/lib/transformers';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await seedTable(prisma, 'Country');
  await seedTable(
    prisma,
    'Org',
    createForeignKeyListTransformer([
      { foreignKeyName: 'countryId', foreignRecordName: 'country' },
    ]),
  );
  await seedTable(
    prisma,
    'User',
    createForeignKeyListTransformer([
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
    ]),
  );
  await seedTable(
    prisma,
    'UserInvite',
    createForeignKeyListTransformer([
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
      { foreignKeyName: 'createdById', foreignRecordName: 'createdBy' },
    ]),
  );
  await seedTable(
    prisma,
    'Report',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
    ]),
  );
  await seedTable(
    prisma,
    'GiftDate',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
    ]),
  );
  await seedTable(
    prisma,
    'GiftCardIntegration',
    createForeignKeyListTransformer([
      { foreignKeyName: 'countryId', foreignRecordName: 'country' },
    ]),
  );
  await seedTable(
    prisma,
    'GiftCardRequest',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
      {
        foreignKeyName: 'giftCardIntegrationId',
        foreignRecordName: 'giftCardIntegration',
      },
    ]),
  );
  await seedTable(
    prisma,
    'GiftCard',
    createForeignKeyListTransformer([
      { foreignKeyName: 'createdById', foreignRecordName: 'createdBy' },
      {
        foreignKeyName: 'giftCardRequestId',
        foreignRecordName: 'giftCardRequest',
      },
    ]),
  );

  await seedTable(prisma, 'ClaimPointsEvent');
  await seedTable(
    prisma,
    'OrgTransaction',
    createForeignKeyListTransformer([
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
      { foreignKeyName: 'createdById', foreignRecordName: 'createdBy' },
      {
        foreignKeyName: 'eventId',
        foreignRecordName: 'event',
      },
    ]),
  );
  await seedTable(
    prisma,
    'ClaimPointsEventFulfillment',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
      {
        foreignKeyName: 'orgTransactionId',
        foreignRecordName: 'orgTransaction',
      },
    ]),
  );

  await seedTable(
    prisma,
    'BalanceSide',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
    ]),
  );

  await seedTable(
    prisma,
    'Ledger',
    createForeignKeyListTransformer([
      { foreignKeyName: 'fromId', foreignRecordName: 'from' },
      { foreignKeyName: 'toId', foreignRecordName: 'to' },
    ]),
  );
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
