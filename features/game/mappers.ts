import { DbGame, DbGameHistory, DbGamePlayer, DbGameWithRoundsAndPlayers } from "@/drizzle/schema";
import { GameModel, GamePlayerModel, RoundModel } from "./models";
import { DbGameRound } from "@/drizzle/schema/game-round";
import { LetterState } from "@/drizzle/schema/enum/letter-state";

export function MapGameToModel(game: DbGameWithRoundsAndPlayers): GameModel {
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
        players: game.players.map((player) => {
            return mapPlayerToModel(player);
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

export function mapPlayerToModel(player: DbGamePlayer): GamePlayerModel {
    return {
        id: player.userId,
        score: player.score
    }
}

export function mapGameToHistory(game: DbGame, rounds: DbGameRound[], players: DbGamePlayer[]): DbGameHistory {
    return {
        id: "",
        createdAt: new Date() ,        
        userHostId: game.userHostId,
        gameMode: game.gameMode,
        totalScore: 100,
        rounds: rounds.map(r => {
            return {                
                index: r.roundNumber,
                word: r.word.word,
                wordGuessed: r.guesses.some(g => !g.letters.some(l => l.state != LetterState.Correct)),
                guesses: []
            }
        }),
        players: []
    }
}