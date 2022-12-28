/*
  Warnings:

  - You are about to drop the column `createdById` on the `ClaimPointsEventFulfillment` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `OrgTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" DROP CONSTRAINT "ClaimPointsEventFulfillment_createdById_fkey";

-- AlterTable
ALTER TABLE "ClaimPointsEventFulfillment" DROP COLUMN "createdById";

-- AlterTable
ALTER TABLE "OrgTransaction" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrgTransaction" ADD CONSTRAINT "OrgTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
