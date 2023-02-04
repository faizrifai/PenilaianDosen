/*
  Warnings:

  - You are about to drop the column `nim_mhs` on the `data_mahasiswa` table. All the data in the column will be lost.
  - Added the required column `nim_mhs` to the `nilai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `data_mahasiswa` DROP FOREIGN KEY `Data_mahasiswa_nim_mhs_fkey`;

-- DropIndex
DROP INDEX `nilai_nim_key` ON `nilai`;

-- AlterTable
ALTER TABLE `data_mahasiswa` DROP COLUMN `nim_mhs`;

-- AlterTable
ALTER TABLE `nilai` ADD COLUMN `nim_mhs` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_nim_mhs_fkey` FOREIGN KEY (`nim_mhs`) REFERENCES `Data_mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
