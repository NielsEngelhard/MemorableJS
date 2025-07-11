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
    static filterNewLetters(validatedWord: ValidatedLetter[], previouslyGuessedLetters: ValidatedLetter[]): ValidatedLetter[] {
        var newLetters: ValidatedLetter[] = [];

        for(var i=0; i<validatedWord.length; i++) {
            const currentLetter = validatedWord[i];

            if (currentLetter.state == LetterState.Correct) {
                addCorrectGuessIfNotAlreadyExist(currentLetter, newLetters);
            }
        }

        return newLetters;        
    }    
}

function addCorrectGuessIfNotAlreadyExist(validatedLetter: ValidatedLetter, newLetters: ValidatedLetter[]) {
    if (!newLetters.some(l => l.letter == validatedLetter.letter && l.position == validatedLetter.position && l.state == validatedLetter.state)) {
        newLetters.push(validatedLetter);
    }
}
