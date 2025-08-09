/*
  Warnings:

  - You are about to drop the column `stripePriceUd` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `stripePriceId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `stripePriceUd`,
    ADD COLUMN `stripePriceId` VARCHAR(191) NOT NULL;
