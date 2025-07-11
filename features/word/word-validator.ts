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
                state: LetterState.Wrong
            }

            const guessIsCorrect = guessedLetter == actualLetter;
            if (guessIsCorrect) {
                letterData.position = i + 1;
                letterData.state = LetterState.Correct;
            } else if (word.toUpperCase().includes(guessedLetter)) {
                letterData.state = LetterState.Misplaced;
            };

            validatedLetters[i] = letterData;            
        }

        return validatedLetters;
    }

    // Filter only the newly guessed letters
    static filterNewLetters(validatedWord: ValidatedLetter[], existingLetters: ValidatedLetter[]): ValidatedLetter[] {
        var newLetters: ValidatedLetter[] = new Array(validatedWord.length);

        for(var i=0; i<validatedWord.length; i++) {
            
        }

        return newLetters;        
    }
}