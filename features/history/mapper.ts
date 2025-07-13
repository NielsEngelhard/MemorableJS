import { DbGameHistory } from "@/drizzle/schema";
import { GameHistoryModel } from "./models";

export function mapGameHistoryToModel(gameHistory: DbGameHistory): GameHistoryModel {
    return {
        id: gameHistory.id,
        players: gameHistory.players,
        totalScore: gameHistory.totalScore,
        rounds: gameHistory.rounds,
        gameMode: gameHistory.gameMode,
        creationDate: gameHistory.createdAt,
    }
}