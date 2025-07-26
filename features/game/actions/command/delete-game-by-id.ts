import { db } from "@/drizzle/db";
import { GameTable } from "@/drizzle/schema";
import { DbOrTransaction } from "@/drizzle/util/transaction-util";
import { eq } from "drizzle-orm";

export default async function DeleteGameById(gameId: string, tx?: DbOrTransaction): Promise<boolean> {
    const dbInstance = tx || db;
    
    const existingGame = await dbInstance.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.id, gameId)
    });
    
    if (!existingGame) return false;
    
    const result = await dbInstance.delete(GameTable)
        .where(eq(GameTable.id, gameId));
    
    return (result.rowCount ?? 0) > 0;
}