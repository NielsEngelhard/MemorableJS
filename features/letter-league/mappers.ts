import { DbLetterLeagueGame } from "@/drizzle/schema";
import { LetterLeagueGame } from "./schemas";

export default function MapLetterLeagueGameFromDb(game: DbLetterLeagueGame): LetterLeagueGame {
    return {
        id: game.id,
        currentRound: game.currentRound,
        gameMode: game.gameMode,
        maxAttemptsPerRound: game.maxAttemptsPerRound,
        timePerTurn: game.timePerTurn,
        totalRounds: game.totalRounds,
        userHostId: game.userHostId,
        wordLength: game.words[0].word.length,
        guesses: [],
        createdAt: game.createdAt,
        firstLetter: game.words.find(w => w.round == game.currentRound)?.word[0] ?? "?"
    }
}