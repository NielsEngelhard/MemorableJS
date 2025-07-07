import { DbGame, DbGameWithRounds } from "@/drizzle/schema";
import { GameModel, RoundModel } from "./models";
import { DbGameRound } from "@/drizzle/schema/game-round";

export function MapGameToModel(game: DbGameWithRounds): GameModel {
    return {
        id: game.id,
        currentRoundIndex: game.currentRoundIndex,
        gameMode: game.gameMode,
        maxAttemptsPerRound: game.maxAttemptsPerRound,
        timePerTurn: game.timePerTurn,
        totalRounds: game.totalRounds,
        userHostId: game.userHostId,
        wordLength: game.wordLength,        
        createdAt: game.createdAt,
        rounds: game.rounds.map((round) => {
            return mapRoundToModel(round);
        }),
    }
}

export function mapRoundToModel(round: DbGameRound): RoundModel {
    return {
        id: round.id,
        roundNumber: round.roundNumber,
        currentGuessIndex: round.currentGuessIndex,
        guessedLetters: round.guessedLetters,
        guesses: round.guesses
    }
}