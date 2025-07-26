import { generateWodGameId } from "@/features/game/util/game-id-generator";
import { db } from "@/drizzle/db";
import { DbGameWithRoundsAndPlayers, GameMode } from "@/drizzle/schema";

export default async function GetWodGameByUserId(userId: string): Promise<DbGameWithRoundsAndPlayers | null> {
    const gameId: string = generateWodGameId(userId);

    const game = await db.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.id, gameId),
        with: {
            rounds: true,
            players: true
        }
    });

    if (game?.gameMode != GameMode.WordOfTheDay) throw Error(`CORRUPT STATE: Found WOD game with  incorrect game mode or id. GameId: ${gameId}`);

    if (game) return game as unknown as DbGameWithRoundsAndPlayers;   

    return null;
}