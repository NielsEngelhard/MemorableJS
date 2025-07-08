import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter, Word } from "./word-models";

export interface WordValidationResult {
  validatedLetters: ValidatedLetter[];
  allCorrect: boolean;
  score: number; // Score for this specific guess
}

export default function validateWordGuess(guess: string, actualWord: Word, guessedLetters: ValidatedLetter[] = []): WordValidationResult {
  if (guess.length !== actualWord.letters.length) throw Error("INVALID INPUT: guess must be as long as actual guess");

  let validatedLetters: ValidatedLetter[] = new Array(guess.length);

  // First determine all correct letters. This is necesarry to determine after that if other guessed letters are wrong positioned or wrong.
  for (var i=0; i<guess.length; i++) {
    const guessedLetter = guess[i].toLowerCase();
    const actualLetter = actualWord.letters[i];

    if (actualLetter.guessed || guessedLetter == actualLetter.letter.toLowerCase()) {
      const letterData = {
        position: i + 1,
        letter: guessedLetter,
        state: LetterState.Correct  
      };

      validatedLetters[i] = letterData;
      actualWord.letters[i].guessed = true;

      updateGuessedLetters(letterData, guessedLetters);
    }
  }

  const unguessedLetters: string[] = actualWord.letters.filter(l => l.guessed == false).map(l => l.letter.toLowerCase());

  // Check all wrong and wrong position letters
  for (var i=0; i<guess.length; i++) {
    if (validatedLetters[i] != undefined) continue;

    const guessedLetter = guess[i].toLowerCase();
    const letterOnWrongPosition = unguessedLetters.includes(guessedLetter);
  
    const letterData = {
      position: i + 1,
      letter: guessedLetter,
      state: LetterState.Wrong        
    }   

    if (letterOnWrongPosition) {
      letterData.state = LetterState.WrongPosition;

    } else { // WRONG entirely
      letterData.state = LetterState.Wrong;
    };

    updateGuessedLetters(letterData, guessedLetters);
    validatedLetters[i] = letterData;
  }
  
  return {
    validatedLetters: validatedLetters,
    allCorrect: validatedLetters.every(letter => letter.state === LetterState.Correct),
    score: 10
  };
}

function updateGuessedLetters(letterData: ValidatedLetter, guessedLetters: ValidatedLetter[]) {
  // Add the letter if it doesn't already exist with the same state
  if (!guessedLetters.some(l => l.letter === letterData.letter && l.state === letterData.state)) {
    guessedLetters.push(letterData);
  }

  // Special case: if letter is Wrong, remove any previous entries with different states (if any)
  if (letterData.state === LetterState.Wrong) {
    for (let i = guessedLetters.length - 1; i >= 0; i--) {
      if (guessedLetters[i].letter === letterData.letter && guessedLetters[i].state !== LetterState.Wrong) {
        guessedLetters.splice(i, 1);
      }
    }
  }
}