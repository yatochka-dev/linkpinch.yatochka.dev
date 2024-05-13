/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_urlId_fkey";

-- DropTable
DROP TABLE "URL";

-- CreateTable
CREATE TABLE "ShortenedURL" (
    "id" TEXT NOT NULL,
    "originalURL" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ShortenedURL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedURL_path_key" ON "ShortenedURL"("path");

-- CreateIndex
CREATE INDEX "ShortenedURL_originalURL_path_id_idx" ON "ShortenedURL"("originalURL", "path", "id");

-- AddForeignKey
ALTER TABLE "ShortenedURL" ADD CONSTRAINT "ShortenedURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "ShortenedURL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
