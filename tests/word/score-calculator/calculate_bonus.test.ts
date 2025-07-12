import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { INSTANT_CORRECT_POINTS, INSTANT_GUESS_BONUS, POINTS_PER_STREAK_ITEM } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate bonus points", () => {
    it("should assign bonus points when the guess is guessed in the first round", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
            { letter: "C", position: 3, state: LetterState.Correct }
        ];

        const expectedScore = (newCorrectLetters.length * INSTANT_CORRECT_POINTS)  // CORRECT PER LETTER
                              + INSTANT_GUESS_BONUS                                // BONUS FOR INSTANT GUESS BONUS
                              + POINTS_PER_STREAK_ITEM * newCorrectLetters.length; // BONUS FOR HAVING A STREAK OF CORRECT LETTERS

        const score = ScoreCalculator.calculate(newCorrectLetters, []);

        expect(score).toEqual(INSTANT_CORRECT_POINTS * newCorrectLetters.length);
    });
});
