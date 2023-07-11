/*
  Warnings:

  - You are about to drop the column `userId` on the `GiftCardRequest` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `GiftCardRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `GiftCardRequest` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "GiftCardRequest"
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "ownerId" TEXT;

-- Set values of ownerId and createdById
UPDATE "GiftCardRequest" set "ownerId" = "userId";
UPDATE "GiftCardRequest" set "createdById" = "userId";
ALTER TABLE "GiftCardRequest" ALTER COLUMN "ownerId" SET NOT NULL;
ALTER TABLE "GiftCardRequest" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "GiftCardRequest" DROP CONSTRAINT "GiftCardRequest_userId_fkey";
ALTER TABLE "GiftCardRequest" DROP COLUMN "userId";
