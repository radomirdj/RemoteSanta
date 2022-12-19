-- CreateTable
CREATE TABLE "GiftCard" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "giftCardRequestId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GiftCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftCard" ADD CONSTRAINT "GiftCard_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCard" ADD CONSTRAINT "GiftCard_giftCardRequestId_fkey" FOREIGN KEY ("giftCardRequestId") REFERENCES "GiftCardRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
