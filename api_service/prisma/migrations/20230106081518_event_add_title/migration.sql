/*
  Warnings:

  - Added the required column `title` to the `ClaimPointsEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClaimPointsEvent" ADD COLUMN     "title" TEXT NOT NULL;
