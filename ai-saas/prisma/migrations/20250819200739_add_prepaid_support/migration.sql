-- AlterTable
ALTER TABLE `User` ADD COLUMN `lastCreditRefill` DATETIME(3) NULL,
    ADD COLUMN `prepaidCredits` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `PrepaidOrder` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `stripePaymentId` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `creditsAmount` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCEEDED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PrepaidOrder_stripePaymentId_key`(`stripePaymentId`),
    INDEX `PrepaidOrder_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrepaidOrder` ADD CONSTRAINT `PrepaidOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
