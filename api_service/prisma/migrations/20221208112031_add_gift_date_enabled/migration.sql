/*
  Warnings:

  - You are about to drop the column `constraint` on the `GiftCardIntegration` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyAmount` on the `Org` table. All the data in the column will be lost.
  - Made the column `userId` on table `GiftDate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GiftDate" DROP CONSTRAINT "GiftDate_userId_fkey";

-- AlterTable
ALTER TABLE "GiftCardIntegration" DROP COLUMN "constraint";

-- AlterTable
ALTER TABLE "GiftDate" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Org" DROP COLUMN "monthlyAmount";

-- AddForeignKey
ALTER TABLE "GiftDate" ADD CONSTRAINT "GiftDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
