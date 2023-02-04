-- DropForeignKey
ALTER TABLE `nilai` DROP FOREIGN KEY `nilai_nim_fkey`;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Data_mahasiswa`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;
