/*
  Warnings:

  - The values [ORG_TO_EMPLOYEES] on the enum `LedgerTypeEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ORG_TO_EMPLOYEES] on the enum `OrgTransactionTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LedgerTypeEnum_new" AS ENUM ('ORG_TO_EMPLOYEES_BY_EVENT', 'ADMIN_TO_ORG', 'GIFT_CARD_REQUEST_CREATED', 'GIFT_CARD_REQUEST_COMPLETED', 'GIFT_CARD_REQUEST_DECLINED');
ALTER TABLE "Ledger" ALTER COLUMN "type" TYPE "LedgerTypeEnum_new" USING ("type"::text::"LedgerTypeEnum_new");
ALTER TYPE "LedgerTypeEnum" RENAME TO "LedgerTypeEnum_old";
ALTER TYPE "LedgerTypeEnum_new" RENAME TO "LedgerTypeEnum";
DROP TYPE "LedgerTypeEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrgTransactionTypeEnum_new" AS ENUM ('ORG_TO_EMPLOYEES_BY_EVENT', 'ADMIN_TO_ORG');
ALTER TABLE "OrgTransaction" ALTER COLUMN "type" TYPE "OrgTransactionTypeEnum_new" USING ("type"::text::"OrgTransactionTypeEnum_new");
ALTER TYPE "OrgTransactionTypeEnum" RENAME TO "OrgTransactionTypeEnum_old";
ALTER TYPE "OrgTransactionTypeEnum_new" RENAME TO "OrgTransactionTypeEnum";
DROP TYPE "OrgTransactionTypeEnum_old";
COMMIT;
