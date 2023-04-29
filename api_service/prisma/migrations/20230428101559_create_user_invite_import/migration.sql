-- CreateEnum
CREATE TYPE "UserInviteSingleImportStatusEnum" AS ENUM ('PENDING', 'SUCCESS', 'FAIL');

-- CreateTable
CREATE TABLE "UserInviteImportJob" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInviteImportJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInviteSingleImport" (
    "id" TEXT NOT NULL,
    "status" "UserInviteSingleImportStatusEnum" NOT NULL DEFAULT 'PENDING',
    "failureReason" TEXT,
    "email" TEXT NOT NULL,
    "userInviteImportJobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInviteSingleImport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInviteImportJob" ADD CONSTRAINT "UserInviteImportJob_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInviteImportJob" ADD CONSTRAINT "UserInviteImportJob_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInviteSingleImport" ADD CONSTRAINT "UserInviteSingleImport_userInviteImportJobId_fkey" FOREIGN KEY ("userInviteImportJobId") REFERENCES "UserInviteImportJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
