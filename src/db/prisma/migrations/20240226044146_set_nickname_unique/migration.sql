/*
  Warnings:

  - A unique constraint covering the columns `[nickName]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_nickName_key" ON "Profile"("nickName");
