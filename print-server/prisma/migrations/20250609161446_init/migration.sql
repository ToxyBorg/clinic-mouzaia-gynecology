-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('DRAFT', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "ColposcopyExam" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER NOT NULL,
    "patientFileNumber" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "doctorName" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "findings" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "pdfData" BYTEA NOT NULL,
    "pdfFileName" TEXT NOT NULL,
    "notes" TEXT,
    "status" "ExamStatus" NOT NULL DEFAULT 'COMPLETED',

    CONSTRAINT "ColposcopyExam_pkey" PRIMARY KEY ("id")
);
