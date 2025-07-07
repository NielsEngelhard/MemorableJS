import { LetterState } from "@/drizzle/schema/enum/letter-state";

export type ValidatedLetter = {
    letter?: string;
    position?: number;
    state?: LetterState;
}

export type ValidatedWord = {
    guessIndex: number;    
    letters: ValidatedLetter[];
}

export interface Word {
    word: string;
    letters: WordLetter[];
}

export interface WordLetter {
    letter: string;
    guessed: boolean;
}