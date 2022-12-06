// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { seedTable } from './seed/lib/dbUtils';
import { createForeignKeyListTransformer } from './seed/lib/transformers';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await seedTable(prisma, 'User');
  await seedTable(
    prisma,
    'Report',
    createForeignKeyListTransformer([
      { foreignKeyName: 'userId', foreignRecordName: 'user' },
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
