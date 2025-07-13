import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { INSTANT_CORRECT_POINTS, POINTS_PER_STREAK_ITEM } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate bonus points", () => {
    it("should assign streak bonus when the streak threshold is surpassed exactly", () => {

        // Streak of 3 after each other
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
            { letter: "C", position: 3, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 6,
            wordGuessed: false,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.streakScore).toEqual(newCorrectLetters.length * POINTS_PER_STREAK_ITEM);
    });

    it("should assign streak bonus when the streak threshold is surpassed by a few", () => {

        // Streak of 5 after each other
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 5, state: LetterState.Correct },
            { letter: "C", position: 7, state: LetterState.Correct },
            { letter: "B", position: 6, state: LetterState.Correct },            
            { letter: "Q", position: 8, state: LetterState.Correct },
            { letter: "Z", position: 4, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 6,
            wordGuessed: false,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.streakScore).toEqual(newCorrectLetters.length * POINTS_PER_STREAK_ITEM);
    });   
    
    it("should not assign streak bonus when one of the items in the streak has another letter state", () => {

        // Streak of 5 after each other
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "Z", position: 1, state: LetterState.Correct },
            { letter: "A", position: 2, state: LetterState.Wrong },
            { letter: "B", position: 3, state: LetterState.Correct },
            { letter: "C", position: 4, state: LetterState.Correct },
            { letter: "Q", position: 5, state: LetterState.Misplaced },
            { letter: "Q", position: 6, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 6,
            wordGuessed: false,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.streakScore).toEqual(0);
    });       
});
