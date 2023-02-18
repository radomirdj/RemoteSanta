-- DropForeignKey
ALTER TABLE "UserInvite" DROP CONSTRAINT "UserInvite_createdById_fkey";

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
