import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";
import { LetterLeagueWord, LetterLeagueWordLetter } from "../schemas";

export interface WordValidationResponse {
  validatedWord: ValidatedLetter[];
  wrongLetters: string[];
  wrongPositionLetters: string[];
}

// TODO: UNIT TEST
export default function validateLetterLeagueWord(guess: string, actualWord: LetterLeagueWord): WordValidationResponse {
  if (guess.length !== actualWord.letters.length) throw Error("INVALID INPUT: guess must be as long as actual guess");

  let result: ValidatedLetter[] = new Array(guess.length);

  // First determine all correct letters. This is necesarry to determine after that if other guessed letters are wrong positioned or wrong.
  for (var i=0; i<guess.length; i++) {
    const guessedLetter = guess[i].toLowerCase();
    const actualLetter = actualWord.letters[i];

    if (actualLetter.guessed || guessedLetter == actualLetter.letter.toLowerCase()) {
      result[i] = {
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
    if (result[i] != undefined) continue;

    const guessedLetter = guess[i].toLowerCase();
    const letterOnWrongPosition = unguessedLetters.includes(guessedLetter);
  
    if (letterOnWrongPosition) {
      result[i] = {
        position: i + 1, // TODO: ga ik position ooit gebruiken uberhaupt??
        letter: guessedLetter,
        state: LetterState.Correct        
      }   
    } else {

    }
  }

  for (var i=0; i<guess.length; i++) {
    const guessedLetter = guess[i].toLowerCase();
    const actualLetter = actualWord.letters[i].letter.toLowerCase();
    const position = i+1;

    let state = LetterState.Wrong;

    if (guessedLetter == actualLetter) {
      
    }

    // TODO: SWS eerst alle correct zetten, anders kan de wrong positions niet worden bepaald!!

    // CORRECT
    if (guessedLetter == actualLetter) {
      state = LetterState.Correct;
    }
    // WRONG POSITION
    else if (_actual.includes(guessedLetter)) {
      state = LetterState.WrongPosition;
    }

    result.push({
      letter: _guess[i],
      position: position,
      state: state
    });
  }
  
  return result;
}

function ValidateLetter(guess: string, actual: LetterLeagueWordLetter, position: number): ValidatedLetter {
  let result: ValidatedLetter = {
    letter: guess,    
    position: position,
    state: LetterState.Wrong
  }

  if (guess == actual) {
    result.state = LetterState.Correct;
    return result;
  }
  


  return result;
}