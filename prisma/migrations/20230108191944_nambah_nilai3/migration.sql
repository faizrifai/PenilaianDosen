/*
  Warnings:

  - You are about to alter the column `IP` on the `nilai` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `nilai` MODIFY `IP` DOUBLE NOT NULL;
