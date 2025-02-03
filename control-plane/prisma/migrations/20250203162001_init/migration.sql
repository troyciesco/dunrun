-- CreateTable
CREATE TABLE "Run" (
    "id" SERIAL NOT NULL,
    "dungeonId" INTEGER NOT NULL,
    "partyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "runId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "currentTurnId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleParticipant" (
    "id" SERIAL NOT NULL,
    "battleId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "entityType" TEXT NOT NULL,
    "cachedHp" INTEGER,
    "turnOrder" INTEGER,

    CONSTRAINT "BattleParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Battle_currentTurnId_key" ON "Battle"("currentTurnId");

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_currentTurnId_fkey" FOREIGN KEY ("currentTurnId") REFERENCES "BattleParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleParticipant" ADD CONSTRAINT "BattleParticipant_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
