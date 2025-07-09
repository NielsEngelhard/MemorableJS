import { DbGameRound } from "@/drizzle/schema";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { WordFactory } from "@/features/word/word-factory";
import {v4 as uuid} from 'uuid';

export class GameRoundFactory {
    static createDbRound(word: string, roundNumber: number, gameId: string): DbGameRound {
        return {
            id: uuid(),
            word: WordFactory.create(word),
            roundNumber: roundNumber,
            currentGuessIndex: 0,
            gameId: gameId,
            guesses: [],
            guessedLetters: [{ position: 0, state: LetterState.Correct, letter: word[0] }]
        }
    }

    static createDbRounds(words: string[], gameId: string): DbGameRound[] {
        return words.map((word, index) => {
            return this.createDbRound(word, index + 1, gameId);
        });
    }
}