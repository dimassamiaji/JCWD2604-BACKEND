-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('user', 'admin') NULL DEFAULT 'user';
