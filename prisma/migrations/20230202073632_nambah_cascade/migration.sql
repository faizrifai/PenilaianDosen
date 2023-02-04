-- DropForeignKey
ALTER TABLE `data_dosen` DROP FOREIGN KEY `Data_dosen_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `data_mahasiswa` DROP FOREIGN KEY `Data_mahasiswa_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `Data_mahasiswa` ADD CONSTRAINT `Data_mahasiswa_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Data_dosen` ADD CONSTRAINT `Data_dosen_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
