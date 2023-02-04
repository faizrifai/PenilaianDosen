/*
  Warnings:

  - A unique constraint covering the columns `[nim]` on the table `Data_mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nim]` on the table `nilai` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nim_mhs` to the `Data_mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data_mahasiswa` ADD COLUMN `nim_mhs` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nilai` ADD COLUMN `nim` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Data_mahasiswa_nim_key` ON `Data_mahasiswa`(`nim`);

-- CreateIndex
CREATE UNIQUE INDEX `nilai_nim_key` ON `nilai`(`nim`);

-- AddForeignKey
ALTER TABLE `Data_mahasiswa` ADD CONSTRAINT `Data_mahasiswa_nim_mhs_fkey` FOREIGN KEY (`nim_mhs`) REFERENCES `nilai`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
