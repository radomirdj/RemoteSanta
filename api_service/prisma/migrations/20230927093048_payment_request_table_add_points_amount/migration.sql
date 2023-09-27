/*
  Warnings:

  - Added the required column `pointsAmount` to the `PaymentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentRequest" ADD COLUMN     "pointsAmount" INTEGER NOT NULL;
