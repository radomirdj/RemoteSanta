/*
  Warnings:

  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "GiftCardIntegration" ALTER COLUMN "priority" SET DEFAULT 1000000;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" DATE NOT NULL,
ADD COLUMN     "gender" "GenderEnum" NOT NULL;
