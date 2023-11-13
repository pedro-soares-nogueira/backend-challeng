-- CreateTable
CREATE TABLE "documents" (
    "debtID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "governmentId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "debtAmount" DOUBLE PRECISION NOT NULL,
    "debtDueDate" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("debtID")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_email_key" ON "documents"("email");
