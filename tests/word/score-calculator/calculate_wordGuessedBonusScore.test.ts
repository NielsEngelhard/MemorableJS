import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { INSTANT_CORRECT_POINTS, INSTANT_GUESS_BONUS, POINTS_PER_STREAK_ITEM, SECOND_GUESS_BONUS, THIRD_GUESS_BONUS } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate bonus points", () => {
    it("should assign bonus points when the guess is guessed in the first round", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 1,
            wordGuessed: true,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.wordGuessedBonusScore).toEqual(INSTANT_GUESS_BONUS);
    });

    it("should assign bonus points when the guess is guessed in the second round", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 2,
            wordGuessed: true,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.wordGuessedBonusScore).toEqual(SECOND_GUESS_BONUS);
    });
    
    it("should assign bonus points when the guess is guessed in the third round", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 3,
            wordGuessed: true,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });

        expect(score.wordGuessedBonusScore).toEqual(THIRD_GUESS_BONUS);
    });  
    
    it("should not assign bonus points if guess is guessed after third round", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 2, state: LetterState.Correct },
        ];

        const score = ScoreCalculator.calculate({
            currentGuessIndex: 4,
            wordGuessed: true,
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
        });


        expect(score.wordGuessedBonusScore).toEqual(0);
    });      
});
