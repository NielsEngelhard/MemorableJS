import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";

export default function validateLetterLeagueWord(guess: string, actualWord: string): ValidatedLetter[] | null {
  // Return null if inputs are invalid
  if (!guess || !actualWord || guess.length !== actualWord.length) {
    return null;
  }

  // Convert strings to lowercase for case-insensitive comparison
  const lowerGuess = guess.toLowerCase();
  const lowerActual = actualWord.toLowerCase();
  
  // Create a map to track remaining letters in the actual word
  // This helps us handle duplicate letters correctly
  const remainingLetters = new Map<string, number>();
  
  for (const letter of lowerActual) {
    remainingLetters.set(letter, (remainingLetters.get(letter) || 0) + 1);
  }
  
  // First pass: mark correct letters
  const result: ValidatedLetter[] = Array(guess.length).fill({}).map(() => ({ letter: undefined, state: undefined }));
  
  for (let i = 0; i < lowerGuess.length; i++) {
    const guessLetter = lowerGuess[i];
    result[i].letter = guessLetter;
    
    if (guessLetter === lowerActual[i]) {
      result[i].state = LetterState.Correct;
      // Decrement the count of this letter in remaining letters
      remainingLetters.set(guessLetter, remainingLetters.get(guessLetter)! - 1);
    }
  }
  
  // Second pass: mark wrong position or wrong letters
  for (let i = 0; i < lowerGuess.length; i++) {
    const guessLetter = lowerGuess[i];
    
    // Skip letters that are already marked as correct
    if (result[i].state === LetterState.Correct) {
      continue;
    }
    
    // If the letter exists in the actual word and we haven't used all instances
    if (remainingLetters.has(guessLetter) && remainingLetters.get(guessLetter)! > 0) {
      result[i].state = LetterState.WrongPosition;
      // Decrement the count of this letter
      remainingLetters.set(guessLetter, remainingLetters.get(guessLetter)! - 1);
    } else {
      result[i].state = LetterState.Wrong;
    }
  }
  
  return result;
}