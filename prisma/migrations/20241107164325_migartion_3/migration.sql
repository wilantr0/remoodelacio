/*
  Warnings:

  - The values [super] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `classroom_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `classrooms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('alumn', 'teacher');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'alumn';
COMMIT;

-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_materials" DROP CONSTRAINT "classroom_materials_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_users" DROP CONSTRAINT "classroom_users_classroom_id_fkey";

-- AlterTable
ALTER TABLE "announcements" ALTER COLUMN "classroom_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "assignments" ALTER COLUMN "classroom_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "classroom_materials" ALTER COLUMN "classroom_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "classroom_users" DROP CONSTRAINT "classroom_users_pkey",
ALTER COLUMN "classroom_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "classroom_users_pkey" PRIMARY KEY ("classroom_id", "userId");

-- AlterTable
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_pkey",
ALTER COLUMN "classroom_id" DROP DEFAULT,
ALTER COLUMN "classroom_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "classrooms_pkey" PRIMARY KEY ("classroom_id");
DROP SEQUENCE "classrooms_classroom_id_seq";

-- AddForeignKey
ALTER TABLE "classroom_users" ADD CONSTRAINT "classroom_users_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_materials" ADD CONSTRAINT "classroom_materials_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
