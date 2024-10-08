// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { seedTable, updateToAdminRole } from './seed/lib/dbUtils';
import { createForeignKeyListTransformer } from './seed/lib/transformers';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await seedTable(prisma, 'Country');
  await seedTable(prisma, 'OrgCompletementStep');
  await seedTable(
    prisma,
    'Org',
    createForeignKeyListTransformer([
      { foreignKeyName: 'countryId', foreignRecordName: 'country' },
    ]),
  );
  await seedTable(prisma, 'OrgCompletementStepStatus');
  await seedTable(
    prisma,
    'User',
    createForeignKeyListTransformer([
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
      { foreignKeyName: 'countryId', foreignRecordName: 'country' },
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
    'UserInviteImportJob',
    createForeignKeyListTransformer([
      { foreignKeyName: 'orgId', foreignRecordName: 'org' },
      { foreignKeyName: 'createdById', foreignRecordName: 'createdBy' },
    ]),
  );

  await seedTable(
    prisma,
    'UserInviteSingleImport',
    createForeignKeyListTransformer([
      {
        foreignKeyName: 'userInviteImportJobId',
        foreignRecordName: 'userInviteImportJob',
      },
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
      { foreignKeyName: 'ownerId', foreignRecordName: 'owner' },
      { foreignKeyName: 'createdById', foreignRecordName: 'createdBy' },
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
  await updateToAdminRole(prisma);
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
