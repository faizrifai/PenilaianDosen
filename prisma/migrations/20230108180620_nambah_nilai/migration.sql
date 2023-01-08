/*
  Warnings:

  - You are about to alter the column `hasil` on the `nilai` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `IP` on the `nilai` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `nilai` MODIFY `hasil` DOUBLE NOT NULL,
    MODIFY `IP` DOUBLE NOT NULL;
