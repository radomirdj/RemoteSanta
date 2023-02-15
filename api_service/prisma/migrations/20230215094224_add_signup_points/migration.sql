/*
  Warnings:

  - You are about to drop the column `description` on the `GiftCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GiftCard" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "signupPoints" INTEGER NOT NULL DEFAULT 0;
