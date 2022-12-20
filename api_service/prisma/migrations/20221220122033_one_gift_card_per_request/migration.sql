/*
  Warnings:

  - A unique constraint covering the columns `[giftCardRequestId]` on the table `GiftCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GiftCard_giftCardRequestId_key" ON "GiftCard"("giftCardRequestId");
