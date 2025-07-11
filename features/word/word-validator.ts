import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "./word-models";

export class WordValidator {
    static validate(guess: string, word: string): ValidatedLetter[] {
        var validatedLetters: ValidatedLetter[] = new Array(guess.length);

        for(var i=0; i<guess.length; i++) {
            const guessedLetter = guess[i].toUpperCase();
            const actualLetter = word[i].toUpperCase();            

            const letterData: ValidatedLetter = {
                letter: guessedLetter,
                position: i + 1,
                state: LetterState.Wrong
            }

            const guessIsCorrect = guessedLetter == actualLetter;
            if (guessIsCorrect) {
                letterData.state = LetterState.Correct;
            } else if (word.includes(guessedLetter)) {
                letterData.state = LetterState.WrongPosition;
            };

            validatedLetters[i] = letterData;            
        }

        return validatedLetters;
    }
}