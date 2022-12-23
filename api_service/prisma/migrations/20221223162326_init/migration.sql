-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('BASIC_USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "GiftDateTypeEnum" AS ENUM ('HOLIDAY', 'BIRTHDAY', 'OTHER');

-- CreateEnum
CREATE TYPE "GiftDateRecurrenceTypeEnum" AS ENUM ('MONTHLY', 'YEARLY', 'NONE');

-- CreateEnum
CREATE TYPE "IntegrationConsraintTypeEnum" AS ENUM ('MIN_MAX', 'LIST');

-- CreateEnum
CREATE TYPE "GiftCardRequestStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'DECLINED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cognitoSub" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "birthDate" DATE NOT NULL,
    "gender" "GenderEnum" NOT NULL,
    "userRole" "UserRoleEnum" NOT NULL DEFAULT 'BASIC_USER',
    "orgId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftDate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "GiftDateTypeEnum" NOT NULL DEFAULT 'OTHER',
    "recurrenceType" "GiftDateRecurrenceTypeEnum" NOT NULL DEFAULT 'NONE',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT,
    "firstAccuranceDate" DATE NOT NULL,

    CONSTRAINT "GiftDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimPointsEvent" (
    "id" TEXT NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ClaimPointsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimPointsEventFulfillment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "claimPointsEventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ClaimPointsEventFulfillment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pointsPerMonth" INTEGER NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftCardIntegration" (
    "id" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "constraintType" "IntegrationConsraintTypeEnum" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1000000,
    "constraintJson" JSONB NOT NULL,

    CONSTRAINT "GiftCardIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftCardRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "giftCardIntegrationId" TEXT NOT NULL,
    "adminComment" TEXT,
    "amount" INTEGER NOT NULL,
    "status" "GiftCardRequestStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GiftCardRequest_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "price" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_cognitoSub_idx" ON "User"("cognitoSub");

-- CreateIndex
CREATE UNIQUE INDEX "GiftCard_giftCardRequestId_key" ON "GiftCard"("giftCardRequestId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftDate" ADD CONSTRAINT "GiftDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" ADD CONSTRAINT "ClaimPointsEventFulfillment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" ADD CONSTRAINT "ClaimPointsEventFulfillment_claimPointsEventId_fkey" FOREIGN KEY ("claimPointsEventId") REFERENCES "ClaimPointsEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimPointsEventFulfillment" ADD CONSTRAINT "ClaimPointsEventFulfillment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCardRequest" ADD CONSTRAINT "GiftCardRequest_giftCardIntegrationId_fkey" FOREIGN KEY ("giftCardIntegrationId") REFERENCES "GiftCardIntegration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCard" ADD CONSTRAINT "GiftCard_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftCard" ADD CONSTRAINT "GiftCard_giftCardRequestId_fkey" FOREIGN KEY ("giftCardRequestId") REFERENCES "GiftCardRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
