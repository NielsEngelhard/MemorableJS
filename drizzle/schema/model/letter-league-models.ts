import { LetterState } from "../enum/letter-state"

export type ValidatedLetter = {
    letter?: string;
    state?: LetterState;    
}

export type ValidatedWord = {
    round: number;
    guess: number;    
    letters: ValidatedLetter[];
}