-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_currentTurnId_fkey";

-- AlterTable
ALTER TABLE "Battle" ALTER COLUMN "currentTurnId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_currentTurnId_fkey" FOREIGN KEY ("currentTurnId") REFERENCES "BattleParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
