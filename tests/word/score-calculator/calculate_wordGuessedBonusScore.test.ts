import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { INSTANT_GUESS_BONUS, SECOND_GUESS_BONUS, JUST_A_GUESS_BONUS } from "@/features/score/score-constants";
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
    
    it("should assign bonus points when the guess is guessed after the second round", () => {
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

        expect(score.wordGuessedBonusScore).toEqual(JUST_A_GUESS_BONUS);
    });  
    
    it("should assign standard guess points if guess is guessed after second round", () => {
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


        expect(score.wordGuessedBonusScore).toEqual(JUST_A_GUESS_BONUS);
    });      
});
