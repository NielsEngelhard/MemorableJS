import { Word } from "./word-models";

export class  LetterLeagueWordFactory {
    static create(word: string): Word {
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

    static createFromArray(words: string[]): Word[] {
        return words.map((word, index) => {
            return this.create(word);
        });
    }
}