/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_provider_providerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");
