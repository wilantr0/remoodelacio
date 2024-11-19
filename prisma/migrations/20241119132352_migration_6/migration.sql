/*
  Warnings:

  - Added the required column `classroom_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipus` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "attendances_userId_date_idx";

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "classroom_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "tipus",
ADD COLUMN     "tipus" TEXT NOT NULL;

-- DropEnum
DROP TYPE "EventType";

-- CreateIndex
CREATE INDEX "attendances_userId_classroom_id_date_idx" ON "attendances"("userId", "classroom_id", "date");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
