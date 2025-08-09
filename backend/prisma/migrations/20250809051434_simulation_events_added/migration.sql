-- CreateTable
CREATE TABLE "public"."simulation_events" (
    "id" TEXT NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "value" DECIMAL(10,4) NOT NULL,
    "frequency" "public"."EventFrequency" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "simulationId" TEXT NOT NULL,

    CONSTRAINT "simulation_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."simulation_events" ADD CONSTRAINT "simulation_events_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "public"."simulations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
