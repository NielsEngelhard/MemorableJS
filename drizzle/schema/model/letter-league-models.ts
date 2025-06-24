import { LetterState } from "../enum/letter-state"

export type ValidatedLetter = {
    letter?: string;
    state?: LetterState;
    position?: number; // position in the word. e.g. 3rd letter in word is wrong position
}

export type ValidatedWord = {
    guess: number;    
    letters: ValidatedLetter[];
}

export interface LetterLeagueGuessResponse {
    guess: ValidatedWord;
    letterStates: ValidatedLetter[];
}