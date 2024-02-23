/*
  Warnings:

  - You are about to alter the column `stock_qty` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.

*/
-- AlterTable
ALTER TABLE `Stock` MODIFY `stock_qty` DECIMAL(18, 2) NOT NULL,
    MODIFY `status` ENUM('Available', 'Booked', 'Lost') NULL DEFAULT 'Available';
