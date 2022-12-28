/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Data_dosen_nip_key` ON `data_dosen`;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
