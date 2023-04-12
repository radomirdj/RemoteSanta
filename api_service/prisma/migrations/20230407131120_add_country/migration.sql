/*
  Warnings:

  - Added the required column `countryId` to the `GiftCardIntegration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftCardIntegration" ADD COLUMN     "countryId" TEXT;
UPDATE "GiftCardIntegration" SET "countryId" = '5e738c3a-dd55-476a-ae8f-29c322807da1';
ALTER TABLE "GiftCardIntegration" ALTER COLUMN "countryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Org" ADD COLUMN "countryId" TEXT;
UPDATE "Org" SET "countryId" = '5e738c3a-dd55-476a-ae8f-29c322807da1';
ALTER TABLE "Org" ALTER COLUMN "countryId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "currencyString" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "conversionRateToPoints" INTEGER NOT NULL,
    "countryName" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- Basic Seed
INSERT INTO "Country" (id, "countryName", "countryCode", "currencyString", "conversionRateToPoints") VALUES ('5e738c3a-dd55-476a-ae8f-29c322807da1', 'Fake', 'Fake', 'Fake', 1);

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCardIntegration" ADD CONSTRAINT "GiftCardIntegration_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
