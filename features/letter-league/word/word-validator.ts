import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";
import { LetterLeagueWord } from "../schemas";

export interface WordValidationResponse {
  validatedLetters: ValidatedLetter[];
  newEntries: ValidatedLetter[];
  allCorrect: boolean;
}

// TODO: UNIT TEST
export default function validateLetterLeagueWord(guess: string, actualWord: LetterLeagueWord): WordValidationResponse {
  if (guess.length !== actualWord.letters.length) throw Error("INVALID INPUT: guess must be as long as actual guess");

  let validatedLetters: ValidatedLetter[] = new Array(guess.length);
  let newEntries: ValidatedLetter[] = [];

  // First determine all correct letters. This is necesarry to determine after that if other guessed letters are wrong positioned or wrong.
  for (var i=0; i<guess.length; i++) {
    const guessedLetter = guess[i].toLowerCase();
    const actualLetter = actualWord.letters[i];

    if (actualLetter.guessed || guessedLetter == actualLetter.letter.toLowerCase()) {
      validatedLetters[i] = {
        position: i + 1,
        letter: guessedLetter,
        state: LetterState.Correct        
      }   

      actualWord.letters[i].guessed = true;
    }
  }

  const unguessedLetters: string[] = actualWord.letters.filter(l => l.guessed == false).map(l => l.letter.toLowerCase());

  // Check all wrong and wrong position letters
  for (var i=0; i<guess.length; i++) {
    if (validatedLetters[i] != undefined) continue;

    const guessedLetter = guess[i].toLowerCase();
    const letterOnWrongPosition = unguessedLetters.includes(guessedLetter);
  
    if (letterOnWrongPosition) {
      validatedLetters[i] = {
        position: i + 1, // TODO: ga ik position ooit gebruiken uberhaupt??
        letter: guessedLetter,
        state: LetterState.Correct        
      }   
    } else {
      validatedLetters[i] = {
        position: i + 1, // TODO: ga ik position ooit gebruiken uberhaupt??
        letter: guessedLetter,
        state: LetterState.WrongPosition        
      }  
    }
  }


  
  return {
    validatedLetters: validatedLetters,
    newEntries: newEntries,
    allCorrect: validatedLetters.every(letter => letter.state === LetterState.Correct)
  };
}
