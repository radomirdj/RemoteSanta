-- CreateEnum
CREATE TYPE "GifDateType" AS ENUM ('HOLIDAY', 'BIRTHDAY', 'OTHER');

-- CreateEnum
CREATE TYPE "GifDateRecurrenceType" AS ENUM ('MONTHLY', 'YEARLY', 'NONE');

-- CreateEnum
CREATE TYPE "IntegrationConsraintType" AS ENUM ('MIN_MAX', 'LIST');

-- CreateTable
CREATE TABLE "GiftDate" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "GifDateType" NOT NULL DEFAULT 'OTHER',
    "recurrenceType" "GifDateRecurrenceType" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "GiftDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monthlyAmount" MONEY NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftCardIntegration" (
    "id" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "constraintType" "IntegrationConsraintType" NOT NULL,
    "constraint" JSONB NOT NULL,

    CONSTRAINT "GiftCardIntegration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftDate" ADD CONSTRAINT "GiftDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
