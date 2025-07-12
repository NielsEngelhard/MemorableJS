import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { INSTANT_CORRECT_POINTS, POINTS_PER_STREAK_ITEM } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate bonus points", () => {
    it("should assign streak bonus when the streak threshold is surpassed", () => {

        // Streak of three after each other
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
            { letter: "C", position: 3, state: LetterState.Correct },
        ];

        const expectedScore = (newCorrectLetters.length * INSTANT_CORRECT_POINTS)   // CORRECT PER LETTER
                              + (newCorrectLetters.length * POINTS_PER_STREAK_ITEM) // STREAK BONUS TIMES STREAK LENGTH                            

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 1,
            wordGuessed: false,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score).toEqual(expectedScore);
    });
});
