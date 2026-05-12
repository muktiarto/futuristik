-- CreateTable
CREATE TABLE "JTLReport" (
    "id" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "foto" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JTLReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JTLReport" ADD CONSTRAINT "JTLReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
