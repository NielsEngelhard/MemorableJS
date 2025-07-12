import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { MISPLACED_POINTS } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate score misplaced", () => {
    it("should assign points of single misplaced when 1 new letter is misplaced", () => {
        const newMisplacedLetters: ValidatedLetter[] = [
            { letter: "X", position: 1, state: LetterState.Misplaced }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newMisplacedLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });
        expect(score).toEqual(MISPLACED_POINTS);
    });

    it("should assign points of when multiple letters are misplaced", () => {
        const newMisplacedLetters: ValidatedLetter[] = [
            { letter: "F", position: 1, state: LetterState.Misplaced },
            { letter: "A", position: 2, state: LetterState.Misplaced },
            { letter: "Q", position: 3, state: LetterState.Misplaced }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newMisplacedLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score).toEqual(MISPLACED_POINTS * newMisplacedLetters.length);
    });         
});
