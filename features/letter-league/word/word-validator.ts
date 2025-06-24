import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";

export default function validateLetterLeagueWord(guess: string, actualWord: string): ValidatedLetter[] | null {
  if (!guess || !actualWord || guess.length !== actualWord.length) return null;

  let result: ValidatedLetter[] = [];

  // Convert strings to lowercase for case-insensitive comparison
  const _guess = guess.toLowerCase();
  const _actual = actualWord.toLowerCase();
  
  for (var i=0; i<guess.length; i++) {
    const guessedLetter = _guess[i];
    const actualLetter = _actual[i];
    const position = i+1;

    let state = LetterState.Wrong;

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