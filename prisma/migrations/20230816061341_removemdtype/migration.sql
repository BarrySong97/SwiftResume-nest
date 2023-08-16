/*
  Warnings:

  - You are about to drop the column `md` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ResumeTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "md",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "ResumeTemplate" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ResumeType";
