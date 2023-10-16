/*
  Warnings:

  - A unique constraint covering the columns `[orgId,orgCompletementStepId]` on the table `OrgCompletementStepStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrgCompletementStepStatus_orgId_orgCompletementStepId_key" ON "OrgCompletementStepStatus"("orgId", "orgCompletementStepId");
