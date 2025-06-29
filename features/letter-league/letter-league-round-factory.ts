import { LetterLeagueRound, LetterLeagueWord } from "./schemas";

export default class LetterLeagueRoundFactory {
    static createRound(word: LetterLeagueWord, roundNumber: number): LetterLeagueRound {
        return {
            word: word,
            roundNumber: roundNumber,
            guessedLetters: [word.letters[0]],
            guesses: [],            
        }
    }

    static createRounds(words: LetterLeagueWord[]): LetterLeagueRound[] {
        return words.map((word, index) => {
            return this.createRound(word, index + 1);
        });
    }
}