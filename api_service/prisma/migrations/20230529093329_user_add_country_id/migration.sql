-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryId" TEXT;
UPDATE "User" u set "countryId" = "o"."countryId" from "Org" "o" where u."orgId" = "o".id;
ALTER TABLE "User" ALTER COLUMN "countryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
