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

    validatedLetters[i] = letterData;
  }

  updateGuessedLetters(validatedLetters, guessedLetters, actualWord);
  
  return {
    validatedLetters: validatedLetters,
    allCorrect: validatedLetters.every(letter => letter.state === LetterState.Correct),
    score: 10
  };
}

// Duplicates can only occur between:
// CORRECT - WRONG
// CORRECT - WRONGPOSITION 
function updateGuessedLetters(justValidatedLetters: ValidatedLetter[], guessedLetters: ValidatedLetter[], currentWordState: Word) {
  for (var i=0; i < justValidatedLetters.length; i++) {
    const letter = justValidatedLetters[i];

    if (letter.state == LetterState.Wrong) {
      addGuessedLetterIfLetterAndStateNotExist(letter, guessedLetters);
    } else if (letter.state == LetterState.Correct) {
      addGuessedLetterIfLetterAndStateAndPositionCombinationNotExist(letter, guessedLetters);
      removeFromWrongPositionIfNotOccurAnymore(letter, guessedLetters, currentWordState);
    } else if (letter.state == LetterState.WrongPosition) {
      addGuessedLetterIfLetterAndStateNotExist(letter, guessedLetters);
    }
  }
}

function addGuessedLetterIfLetterAndStateNotExist(guessedLetter: ValidatedLetter, guessedLetters: ValidatedLetter[]) {
  if (!guessedLetters.some(el => el.letter == guessedLetter.letter && el.state == guessedLetter.state)) {
    if (guessedLetter.state != LetterState.Correct) guessedLetter.position = undefined;

    guessedLetters.push(guessedLetter);
  }
}

function addGuessedLetterIfLetterAndStateAndPositionCombinationNotExist(guessedLetter: ValidatedLetter, guessedLetters: ValidatedLetter[]) {
  if (!guessedLetters.some(el => el.letter == guessedLetter.letter && el.state == guessedLetter.state && el.position == guessedLetter.position)) {
    if (guessedLetter.state != LetterState.Correct) guessedLetter.position = undefined;

    guessedLetters.push(guessedLetter);
  }
}

function removeFromWrongPositionIfNotOccurAnymore(guessedLetter: ValidatedLetter, guessedLetters: ValidatedLetter[], currentWordState: Word) {
  // If the letter does not occur in the word anymore and it is correct - remove it from wrong position if it was there
  if (!currentWordState.letters.some(l => l.guessed == false && l.letter == guessedLetter.letter)) {
    const index = guessedLetters.findIndex(el => 
      el.letter == guessedLetter.letter && el.state == LetterState.WrongPosition
    );
    
    if (index !== -1) {
      guessedLetters.splice(index, 1);
    }
  }
}