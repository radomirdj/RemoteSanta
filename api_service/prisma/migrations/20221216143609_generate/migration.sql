/*
  Warnings:

  - The values [MIN_MAX,LIST] on the enum `GiftCardRequestStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GiftCardRequestStatusEnum_new" AS ENUM ('PENDING', 'COMPLETED', 'DECLINED');
ALTER TABLE "GiftCardRequest" ALTER COLUMN "status" TYPE "GiftCardRequestStatusEnum_new" USING ("status"::text::"GiftCardRequestStatusEnum_new");
ALTER TYPE "GiftCardRequestStatusEnum" RENAME TO "GiftCardRequestStatusEnum_old";
ALTER TYPE "GiftCardRequestStatusEnum_new" RENAME TO "GiftCardRequestStatusEnum";
DROP TYPE "GiftCardRequestStatusEnum_old";
COMMIT;
