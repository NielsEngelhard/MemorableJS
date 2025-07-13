import { DbGamePlayer } from "@/drizzle/schema";

export class GamePlayerFactory {
    static createGamePlayer(gameId: string, userId: string): DbGamePlayer {
        return {
            gameId: gameId,
            userId: userId,
            score: 0
        }
    }
}