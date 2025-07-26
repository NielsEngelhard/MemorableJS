import { db } from "@/drizzle/db";
import { DbGameWithRoundsAndPlayers, GameHistoryTable } from "@/drizzle/schema";
import { DbOrTransaction } from "@/drizzle/util/transaction-util";
import { mapGameToHistory } from "@/features/game/mappers";

export default async function CreateGameHistory(game: DbGameWithRoundsAndPlayers, tx?: DbOrTransaction): Promise<string> {
    const dbInstance = tx || db;
    
    const gameHistory = mapGameToHistory(game);
    const result = await dbInstance.insert(GameHistoryTable).values(gameHistory).returning({
        gameHistoryId: GameHistoryTable.id,        
    });        

    return result[0].gameHistoryId;
}