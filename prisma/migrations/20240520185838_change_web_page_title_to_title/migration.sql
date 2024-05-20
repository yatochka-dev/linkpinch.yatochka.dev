/*
  Warnings:

  - You are about to drop the column `webPageTitle` on the `ShortenedURL` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShortenedURL" DROP COLUMN "webPageTitle",
ADD COLUMN     "title" TEXT;
