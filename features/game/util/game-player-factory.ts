import { DbGamePlayer } from "@/drizzle/schema";

export class GamePlayerFactory {
    static createGamePlayer(gameId: string, userId: string, username: string | null = null): DbGamePlayer {
        return {
            gameId: gameId,
            userId: userId,
            score: 0,
            username: username
        }
    }
}