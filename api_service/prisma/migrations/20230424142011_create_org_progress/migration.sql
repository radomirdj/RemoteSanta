-- CreateTable
CREATE TABLE "OrgCompletementStep" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrgCompletementStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgCompletementStepStatus" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "orgId" TEXT NOT NULL,
    "orgCompletementStepId" TEXT NOT NULL,

    CONSTRAINT "OrgCompletementStepStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrgCompletementStepStatus" ADD CONSTRAINT "OrgCompletementStepStatus_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgCompletementStepStatus" ADD CONSTRAINT "OrgCompletementStepStatus_orgCompletementStepId_fkey" FOREIGN KEY ("orgCompletementStepId") REFERENCES "OrgCompletementStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
