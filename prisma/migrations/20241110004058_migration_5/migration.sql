/*
  Warnings:

  - You are about to drop the column `data` on the `Event` table. All the data in the column will be lost.
  - Changed the type of `dia` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipus` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Excursio', 'Examen', 'Tasca');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "data",
DROP COLUMN "dia",
ADD COLUMN     "dia" TIMESTAMP(3) NOT NULL,
DROP COLUMN "tipus",
ADD COLUMN     "tipus" "EventType" NOT NULL;
