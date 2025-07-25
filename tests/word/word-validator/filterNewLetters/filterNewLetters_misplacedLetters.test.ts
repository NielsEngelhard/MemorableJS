import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/features/word/word-models";
import { WordValidator } from "@/features/word/word-validator";

describe("filterNewLetters correct letters", () => {
    it("should filter misplaced letters that were not already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "L", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Misplaced },
            { letter: "F", position: 3, state: LetterState.Misplaced },
            { letter: "T", position: 4, state: LetterState.Misplaced }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "W", state: LetterState.Misplaced },
            { letter: "L", state: LetterState.Misplaced },
            { letter: "T", state: LetterState.Misplaced }
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "O", state: LetterState.Misplaced }),
                expect.objectContaining({ letter: "F", state: LetterState.Misplaced }),
            ])
        );        
    });

    it("should not filter misplaced letters that were already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "L", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Misplaced },
            { letter: "F", position: 3, state: LetterState.Misplaced },
            { letter: "T", position: 4, state: LetterState.Misplaced }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "F", state: LetterState.Misplaced },
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "O", state: LetterState.Misplaced }),
                expect.objectContaining({ letter: "T", state: LetterState.Misplaced }),
            ])
        );
        
        expect(result).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "F", state: LetterState.Misplaced }),
            ])
        );           
    });

    it("should not add duplicates of misplaced letter in the same guess", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "C", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Correct },
            { letter: "F", position: 3, state: LetterState.Correct },
            { letter: "F", position: 4, state: LetterState.Correct },
            { letter: "A", position: 5, state: LetterState.Misplaced },
            { letter: "A", position: 6, state: LetterState.Misplaced },
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [{ letter: "C", position: 1, state: LetterState.Correct }];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        const misplacedLettersA = result.filter(l => l.letter == "A");

        expect(misplacedLettersA).toHaveLength(1);        
    });       
});
