-- CreateEnum
CREATE TYPE "ClaimPointsEventTypeEnum" AS ENUM ('MONTHLY_ORG_TO_EMPLOYEE', 'SIGN_UP_EVENT');

-- AlterTable
ALTER TABLE "ClaimPointsEvent" ADD COLUMN     "type" "ClaimPointsEventTypeEnum" NOT NULL DEFAULT 'MONTHLY_ORG_TO_EMPLOYEE';
