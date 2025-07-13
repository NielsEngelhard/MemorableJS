import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ScoreCalculator } from "@/features/score/score-calculator";
import { CORRECT_AFTER_MISPLACED_POINTS, INSTANT_CORRECT_POINTS, MISPLACED_POINTS } from "@/features/score/score-constants";
import { ValidatedLetter } from "@/features/word/word-models";

describe("calculate score correct", () => {
    it("should assign points of single correct when 1 new letter is correct", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(INSTANT_CORRECT_POINTS);
    });

    it("should assign correct letter state points with multiple correct", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct },
            { letter: "B", position: 3, state: LetterState.Correct },
            { letter: "C", position: 5, state: LetterState.Correct }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(INSTANT_CORRECT_POINTS * newCorrectLetters.length);
    });
    
    it("should assign less points when a already misplaced letter becomes correct", () => {
        const correctLetterThatWasMisplacedBefore: ValidatedLetter[] = [
            { letter: "A", position: 5, state: LetterState.Correct },
        ];

        const alreadyGuessedLetters: ValidatedLetter[] = [
            { letter: "A", state: LetterState.Misplaced }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: correctLetterThatWasMisplacedBefore,
            previouslyGuessedLetters: alreadyGuessedLetters,
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(CORRECT_AFTER_MISPLACED_POINTS);
    });    
    
    it("should assign less points when multiple already misplaced letters becomes correct and 1 is new correct", () => {
        const correctLetterThatWasMisplacedBefore: ValidatedLetter[] = [
            { letter: "A", position: 2, state: LetterState.Correct }, // INSTANT CORRECT
            { letter: "B", position: 4, state: LetterState.Correct }, // MISPLACED THEN CORRECT
            { letter: "C", position: 6, state: LetterState.Correct }, // MISPLACED THEN CORRECT
        ];

        const alreadyGuessedLetters: ValidatedLetter[] = [
            { letter: "B", state: LetterState.Misplaced },
            { letter: "C", state: LetterState.Misplaced }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: correctLetterThatWasMisplacedBefore,
            previouslyGuessedLetters: alreadyGuessedLetters,
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual((CORRECT_AFTER_MISPLACED_POINTS * 2) + INSTANT_CORRECT_POINTS);
    });        

    it("should ignore casing when determining if a letter is correct 1", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "a", position: 1, state: LetterState.Correct }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(INSTANT_CORRECT_POINTS);
    });   
    
    it("should ignore casing when determining if a letter is correct 2", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });
        
        expect(score.letterStateScore).toEqual(INSTANT_CORRECT_POINTS);
    });      
    
    it("should ignore casing when determining if a letter is correct after being misplaced 1", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "a", position: 1, state: LetterState.Correct }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Misplaced }
        ];        

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: previouslyGuessedLetters,
            wordGuessed: false,
            currentGuessIndex: 4
        });
        
        expect(score.letterStateScore).toEqual(CORRECT_AFTER_MISPLACED_POINTS);
    });   
    
    it("should ignore casing when determining if a letter is correct after being misplaced 2", () => {
        const newCorrectLetters: ValidatedLetter[] = [
            { letter: "A", position: 1, state: LetterState.Correct }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "a", position: 1, state: LetterState.Misplaced }
        ];              

        const score = ScoreCalculator.calculate({
            newLetters: newCorrectLetters,
            previouslyGuessedLetters: previouslyGuessedLetters,
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(CORRECT_AFTER_MISPLACED_POINTS);
    });     

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
        expect(score.letterStateScore).toEqual(MISPLACED_POINTS);
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

        expect(score.letterStateScore).toEqual(MISPLACED_POINTS * newMisplacedLetters.length);
    }); 
    
    it("should not assign score for wrong letter state", () => {
        const newMisplacedLetters: ValidatedLetter[] = [
            { letter: "F", position: 1, state: LetterState.Wrong }
        ];

        const score = ScoreCalculator.calculate({
            newLetters: newMisplacedLetters,
            previouslyGuessedLetters: [],
            wordGuessed: false,
            currentGuessIndex: 4
        });

        expect(score.letterStateScore).toEqual(0);
    });     
});
