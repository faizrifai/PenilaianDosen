-- CreateTable
CREATE TABLE `nilai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nilai_harian` INTEGER NOT NULL,
    `bobot1` INTEGER NOT NULL,
    `ulangan_tengah` INTEGER NOT NULL,
    `bobot2` INTEGER NOT NULL,
    `ulangan_akhir` INTEGER NOT NULL,
    `bobot3` INTEGER NOT NULL,
    `hasil` INTEGER NOT NULL,
    `sks` INTEGER NOT NULL,
    `IP` INTEGER NOT NULL,

    UNIQUE INDEX `nilai_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
