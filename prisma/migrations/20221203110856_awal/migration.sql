-- CreateTable
CREATE TABLE `Data_dosen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `matakuliah` VARCHAR(191) NOT NULL,
    `tanggal_lahir` DATE NOT NULL,
    `nomor_telepon` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Data_dosen_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
