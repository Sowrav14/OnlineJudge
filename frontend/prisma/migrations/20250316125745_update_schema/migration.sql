/*
  Warnings:

  - Added the required column `code` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "passedTest" SET DEFAULT 0,
ALTER COLUMN "time" SET DEFAULT 0.0,
ALTER COLUMN "memory" SET DEFAULT 0,
ALTER COLUMN "totalTest" SET DEFAULT 0;
