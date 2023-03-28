-- AlterEnum
ALTER TYPE "ClaimPointsEventTypeEnum" ADD VALUE 'ORG_SEND_POINTS_EVENT';

-- AlterTable
ALTER TABLE "OrgTransaction" ADD COLUMN     "message" TEXT;
