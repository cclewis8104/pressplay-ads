-- CreateTable
CREATE TABLE "Impression" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placementId" TEXT NOT NULL,
    "creativeId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);
