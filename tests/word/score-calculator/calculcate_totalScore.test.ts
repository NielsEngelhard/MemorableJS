import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { CALCULATE_STREAK_POINTS, INSTANT_CORRECT_POINTS, INSTANT_GUESS_BONUS, POINTS_PER_STREAK_ITEM, SECOND_GUESS_BONUS, JUST_A_GUESS_BONUS } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate total score", () => {
    it("should have correct total score scenario 'INSTANT CORRECT'", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
            { letter: "C", position: 3, state: LetterState.Correct },
            { letter: "D", position: 4, state: LetterState.Correct },
        ];

        const expectedScore = 
            newCorrectLetters.length * INSTANT_CORRECT_POINTS    // FOR NEW CORRECT LETTER STATES
            + INSTANT_GUESS_BONUS                                // FOR FIRST TRY GUESSING THE WORD 
            + CALCULATE_STREAK_POINTS(newCorrectLetters.length); // FOR STREAK OF

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 1,
            wordGuessed: true,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [{ letter: "A", position: 1, state: LetterState.Correct }],
        });

        expect(score.totalScore).toEqual(expectedScore);
    });

  
});
