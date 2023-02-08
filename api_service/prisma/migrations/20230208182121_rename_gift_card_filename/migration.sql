/*
  Warnings:

  - You are about to drop the column `url` on the `GiftCard` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `GiftCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftCard" DROP COLUMN "url",
ADD COLUMN     "fileName" TEXT NOT NULL;
