import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "./word-models";

export interface DetailedValidationResult {
    validatedWord: ValidatedLetter[];
    newLetters: ValidatedLetter[];
    allCorrect: boolean;
}

export class WordValidator {
    static validateAndFilter(guess: string, word: string, previouslyGuessedLetters: ValidatedLetter[] ): DetailedValidationResult {
        const validatedWord = this.validate(guess, word,);
        const newLetters = this.filterNewLetters(validatedWord, previouslyGuessedLetters);
        
        return {
            validatedWord: validatedWord,
            newLetters: newLetters,
            allCorrect: !validatedWord.some(l => l.state != LetterState.Correct)
        }
    }

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
                addCorrectGuessIfNotAlreadyExists(currentLetter, previouslyGuessedLetters, newLetters);
            } else if (currentLetter.state == LetterState.Wrong) {
                addWrongGuessIfNotAlreadyExists(currentLetter, previouslyGuessedLetters, newLetters);
            } else if (currentLetter.state == LetterState.Misplaced) {
                addMisplacedIfNotAlreadyExists(currentLetter, previouslyGuessedLetters, newLetters);
            }
        }

        return newLetters;        
    }    
}

function addCorrectGuessIfNotAlreadyExists(validatedLetter: ValidatedLetter, previouslyGuessedLetters: ValidatedLetter[], newLetters: ValidatedLetter[]) {
    if (!previouslyGuessedLetters.some(l => l.letter == validatedLetter.letter && l.position == validatedLetter.position && l.state == validatedLetter.state)) {
        newLetters.push(validatedLetter);
    }
}

function addWrongGuessIfNotAlreadyExists(validatedLetter: ValidatedLetter, previouslyGuessedLetters: ValidatedLetter[], newLetters: ValidatedLetter[]) {  
    if (!previouslyGuessedLetters.some(l => l.letter == validatedLetter.letter && l.state == validatedLetter.state)) {
        newLetters.push(validatedLetter);
    }
}

function addMisplacedIfNotAlreadyExists(validatedLetter: ValidatedLetter, previouslyGuessedLetters: ValidatedLetter[], newLetters: ValidatedLetter[]) {  
    if (!previouslyGuessedLetters.some(l => l.letter == validatedLetter.letter && l.state == validatedLetter.state)) {
        newLetters.push(validatedLetter);
    }
}
