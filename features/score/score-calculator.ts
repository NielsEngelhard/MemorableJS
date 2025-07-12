import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "../word/word-models";
import { CORRECT_AFTER_MISPLACED_POINTS, INSTANT_CORRECT_POINTS, INSTANT_GUESS_BONUS, MISPLACED_POINTS, SECOND_GUESS_BONUS, THIRD_GUESS_BONUS } from "./score-constants";

interface CalculateCommand {
    newLetters: ValidatedLetter[];
    previouslyGuessedLetters: ValidatedLetter[];
    currentGuessIndex: number;
    wordGuessed: boolean;
}

export class ScoreCalculator {
    static calculate(command: CalculateCommand): number {
        var score: number = 0;
        
        for(var i=0; i<command.newLetters.length; i++) {
            const letter = command.newLetters[i];

            if (letter.state == LetterState.Correct) {
                if (includesMisplacedLetter(letter.letter ?? "", command.previouslyGuessedLetters)) {
                    score += CORRECT_AFTER_MISPLACED_POINTS;
                } else {
                    score += INSTANT_CORRECT_POINTS;
                }
            } else if (letter.state == LetterState.Misplaced) {
                score += MISPLACED_POINTS;
            }
        }

        if (command.wordGuessed == true) {
            score += calculateWordGuessedBonus(command.currentGuessIndex);
        } 

        return score;
    }
}

function includesMisplacedLetter(letter: string, letters: ValidatedLetter[]): boolean {
    return letters.some(l => l.letter?.toUpperCase() == letter.toUpperCase() && l.state == LetterState.Misplaced);
}

function calculateWordGuessedBonus(currentGuessIndex: number): number {
    switch (currentGuessIndex) {
        case 1: 
            return INSTANT_GUESS_BONUS;
        case 2: 
            return SECOND_GUESS_BONUS;
        case 3: 
            return THIRD_GUESS_BONUS;
        default:
            return 0;                        
    }
}
