/*
  Warnings:

  - Added the required column `authorId` to the `Data_dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data_dosen` ADD COLUMN `authorId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Data_dosen` ADD CONSTRAINT `Data_dosen_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
