/*
  Warnings:

  - You are about to drop the column `claimPointsEventId` on the `ClaimPointsEventFulfillment` table. All the data in the column will be lost.
  - Added the required column `orgTransactionId` to the `ClaimPointsEventFulfillment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrgTransactionTypeEnum" AS ENUM ('ORG_TO_EMPLOYEES', 'ADMIN_TO_ORG');

-- DropForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" DROP CONSTRAINT "ClaimPointsEventFulfillment_claimPointsEventId_fkey";

-- AlterTable
ALTER TABLE "ClaimPointsEventFulfillment" DROP COLUMN "claimPointsEventId",
ADD COLUMN     "orgTransactionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrgTransaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgId" TEXT NOT NULL,
    "type" "OrgTransactionTypeEnum" NOT NULL,
    "eventId" TEXT,
    "totalAmount" INTEGER NOT NULL,

    CONSTRAINT "OrgTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" ADD CONSTRAINT "ClaimPointsEventFulfillment_orgTransactionId_fkey" FOREIGN KEY ("orgTransactionId") REFERENCES "OrgTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgTransaction" ADD CONSTRAINT "OrgTransaction_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgTransaction" ADD CONSTRAINT "OrgTransaction_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ClaimPointsEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
