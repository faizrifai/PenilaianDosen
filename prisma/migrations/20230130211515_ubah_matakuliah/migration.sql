/*
  Warnings:

  - You are about to drop the column `matakuliah` on the `data_dosen` table. All the data in the column will be lost.
  - Added the required column `matakuliah` to the `nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data_dosen` DROP COLUMN `matakuliah`;

-- AlterTable
ALTER TABLE `nilai` ADD COLUMN `matakuliah` VARCHAR(191) NOT NULL;
