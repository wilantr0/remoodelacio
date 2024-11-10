-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "tipus" TEXT NOT NULL,
    "descripcio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
