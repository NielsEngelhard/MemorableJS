import { LetterState } from "../enum/letter-state"

export type ValidatedLetter = {
    letter?: string;
    state?: LetterState;    
}

export type ValidatedWord = {
    guess: number;    
    letters: ValidatedLetter[];
}

export type ValidatedWords = {
    round: number;
    words: ValidatedWord[];
}
