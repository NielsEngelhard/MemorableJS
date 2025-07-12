import { ValidatedLetter } from "../word/word-models";

export interface CalculateCommand {
    newLetters: ValidatedLetter[];
    previouslyGuessedLetters: ValidatedLetter[];
    currentGuessIndex: number;
    wordGuessed: boolean;
}

export interface CalculateScoreResult {
    totalScore: number; // Combination of all items you can score on

    letterStateScore: number;
    wordGuessedBonusScore: number;
    streakScore: number;
}