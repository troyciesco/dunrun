/*
  Warnings:

  - Added the required column `status` to the `Run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "status" TEXT NOT NULL;
