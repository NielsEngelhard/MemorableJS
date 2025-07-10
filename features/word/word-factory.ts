import { Word } from "./word-models";

export class WordFactory {
    static create(word: string, firstLetterIsGuessed = true): Word {
        return {
            word: word,
            letters: word.split('').map((letter, index) => {
                return {
                    guessed: firstLetterIsGuessed ? index == 0 : false,
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