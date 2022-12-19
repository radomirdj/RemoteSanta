-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('BASIC_USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRole" "UserRoleEnum" NOT NULL DEFAULT 'BASIC_USER';
