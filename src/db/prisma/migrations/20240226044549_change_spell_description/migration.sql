/*
  Warnings:

  - You are about to drop the column `discription` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
