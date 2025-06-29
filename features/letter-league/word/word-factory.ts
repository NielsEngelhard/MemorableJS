import { LetterLeagueWord } from "../schemas";

export class  LetterLeagueWordFactory {
    static create(word: string): LetterLeagueWord {
        return {
            word: word,
            letters: word.split('').map((letter, index) => {
                return {
                    guessed: index == 0,
                    letter: letter
                }
            })
        }
    }

    static createFromArray(words: string[]): LetterLeagueWord[] {
        return words.map((word, index) => {
            return this.create(word);
        });
    }
}