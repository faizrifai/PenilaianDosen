/*
  Warnings:

  - You are about to drop the column `nim_mhs` on the `nilai` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `nilai` DROP FOREIGN KEY `nilai_nim_mhs_fkey`;

-- AlterTable
ALTER TABLE `nilai` DROP COLUMN `nim_mhs`;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Data_mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
