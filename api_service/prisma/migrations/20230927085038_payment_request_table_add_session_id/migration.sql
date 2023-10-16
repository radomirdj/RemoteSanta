/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `PaymentRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `PaymentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentRequest" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRequest_sessionId_key" ON "PaymentRequest"("sessionId");
