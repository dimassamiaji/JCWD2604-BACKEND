/*
  Warnings:

  - The values [Waiting for Payment,Waiting for Admin Approval,Transaction Completed,Canceled] on the enum `Stock_status` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `TransactionDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TransactionDetail` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stock` MODIFY `status` ENUM('Available', 'Booked', 'Lost') NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `address_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TransactionDetail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`productId`, `transactionId`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
