/*
  Warnings:

  - Added the required column `constraintJson` to the `GiftCardIntegration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftCardIntegration" ADD COLUMN     "constraintJson" JSONB NOT NULL;
