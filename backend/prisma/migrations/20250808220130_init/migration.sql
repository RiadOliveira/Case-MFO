-- CreateEnum
CREATE TYPE "public"."ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."GoalType" AS ENUM ('RETIREMENT', 'SHORT_TERM', 'MEDIUM_TERM');

-- CreateEnum
CREATE TYPE "public"."EventFrequency" AS ENUM ('ONCE', 'MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'INSURANCE_PREMIUM', 'DIVIDEND', 'SALARY', 'EXPENSE');

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "status" "public"."ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "familyProfile" TEXT,
    "totalWealth" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."goals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."GoalType" NOT NULL,
    "targetValue" DECIMAL(65,30) NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallet" (
    "id" TEXT NOT NULL,
    "assetClass" TEXT NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" TEXT NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "frequency" "public"."EventFrequency" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."simulations" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "initialWealth" DECIMAL(65,30) NOT NULL,
    "projectionRate" DECIMAL(65,30) NOT NULL DEFAULT 0.04,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");

-- AddForeignKey
ALTER TABLE "public"."goals" ADD CONSTRAINT "goals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wallet" ADD CONSTRAINT "wallet_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."simulations" ADD CONSTRAINT "simulations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
