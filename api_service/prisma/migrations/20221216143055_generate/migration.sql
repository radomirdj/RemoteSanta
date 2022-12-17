-- CreateEnum
CREATE TYPE "GiftCardRequestStatusEnum" AS ENUM ('MIN_MAX', 'LIST');

-- CreateTable
CREATE TABLE "GiftCardRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "giftCardIntegrationId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "GiftCardRequestStatusEnum" NOT NULL,

    CONSTRAINT "GiftCardRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_giftCardIntegrationId_fkey" FOREIGN KEY ("giftCardIntegrationId") REFERENCES "GiftCardIntegration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
