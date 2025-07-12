import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "../word/word-models";
import { CORRECT_AFTER_MISPLACED_POINTS, INSTANT_CORRECT_POINTS, MISPLACED_POINTS } from "./score-constants";

export class ScoreCalculator {
    static calculate(newLetters: ValidatedLetter[], previouslyGuessedLetters: ValidatedLetter[]): number {
        var score: number = 0;
        
        for(var i=0; i<newLetters.length; i++) {
            const letter = newLetters[i];

            if (letter.state == LetterState.Correct) {
                if (includesMisplacedLetter(letter.letter ?? "", previouslyGuessedLetters)) {
                    score += CORRECT_AFTER_MISPLACED_POINTS;
                } else {
                    score += INSTANT_CORRECT_POINTS;
                }
            } else if (letter.state == LetterState.Misplaced) {
                score += MISPLACED_POINTS;
            }
        }

        return score;
    }
}

function includesMisplacedLetter(letter: string, letters: ValidatedLetter[]): boolean {
    return letters.some(l => l.letter?.toUpperCase() == letter.toUpperCase() && l.state == LetterState.Misplaced);
}