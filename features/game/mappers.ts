import { DbGame, DbGameHistoryInsert, DbGamePlayer, DbGameWithRoundsAndPlayers, gameModeEnum } from "@/drizzle/schema";
import { GameModel, GamePlayerModel, GameTeaserModel, RoundModel } from "./models";
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

export function MapGameToTeaser(game: DbGame): GameTeaserModel {
    return {
        id: game.id,
        createdAt: game.createdAt,
        currentRound: game.currentRoundIndex,
        gameMode: game.gameMode,
        letterSize: game.wordLength,
        totalRounds: game.totalRounds
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

export function mapGameToHistory(game: DbGameWithRoundsAndPlayers): DbGameHistoryInsert {
    return {
        userHostId: game.userHostId,
        gameMode: game.gameMode,
        totalScore: game.players.reduce((sum, player) => sum + player.score, 0),
        rounds: game.rounds.map(r => {
            return {                
                index: r.roundNumber,
                word: r.word.word,
                wordGuessed: r.guesses.some(g => !g.letters.some(l => l.state != LetterState.Correct)),
                guesses: r.guesses.map(guess => guess.letters.map(letter => letter.letter as string).join('')),
                points: r.score
            }
        }),
        players: game.players.map(p => {
            return {
                username: p.username ?? "-",
                score: p.score,
            }
        })
    }
}