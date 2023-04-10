-- CreateEnum
CREATE TYPE "UserInviteRoleEnum" AS ENUM ('BASIC_USER', 'USER_MANAGER');

-- AlterTable
ALTER TABLE "UserInvite" ADD COLUMN     "userRole" "UserInviteRoleEnum" NOT NULL DEFAULT 'BASIC_USER';
