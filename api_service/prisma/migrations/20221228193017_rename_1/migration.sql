-- CreateEnum
CREATE TYPE "BalanceSideTypeEnum" AS ENUM ('USER_ACTIVE', 'USER_RESERVED', 'ORG', 'PLATFORM');

-- CreateTable
CREATE TABLE "BalanceSide" (
    "id" TEXT NOT NULL,
    "type" "BalanceSideTypeEnum" NOT NULL,
    "userId" TEXT,
    "orgId" TEXT,

    CONSTRAINT "BalanceSide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" TEXT NOT NULL,
    "type" "BalanceSideTypeEnum" NOT NULL,
    "amount" INTEGER NOT NULL,
    "detailsJson" JSONB NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceSide" ADD CONSTRAINT "BalanceSide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceSide" ADD CONSTRAINT "BalanceSide_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "BalanceSide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_toId_fkey" FOREIGN KEY ("toId") REFERENCES "BalanceSide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
