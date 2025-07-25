import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/features/word/word-models";
import { WordValidator } from "@/features/word/word-validator";

describe("filterNewLetters correct letters", () => {
    it("should filter wrong letters that were not already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "L", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Wrong },
            { letter: "F", position: 3, state: LetterState.Wrong },
            { letter: "T", position: 4, state: LetterState.Misplaced }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "W", state: LetterState.Wrong },
            { letter: "L", state: LetterState.Wrong },
            { letter: "Z", state: LetterState.Misplaced }
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "O", state: LetterState.Wrong }),
                expect.objectContaining({ letter: "F", state: LetterState.Wrong }),
            ])
        );        
    });

    it("should not filter wrong letters that were already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "L", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Wrong },
            { letter: "F", position: 3, state: LetterState.Wrong },
            { letter: "T", position: 4, state: LetterState.Misplaced }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "F", state: LetterState.Wrong },
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "O", state: LetterState.Wrong }),
            ])
        );   
        
        expect(result).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "F", state: LetterState.Wrong }),
            ])
        );           
    });

    it("should not add duplicates of wrong letter in the same guess", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "C", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Correct },
            { letter: "F", position: 3, state: LetterState.Correct },
            { letter: "F", position: 4, state: LetterState.Correct },
            { letter: "A", position: 5, state: LetterState.Wrong },
            { letter: "A", position: 6, state: LetterState.Wrong },
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [{ letter: "C", position: 1, state: LetterState.Correct }];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        const wrongLettersA = result.filter(l => l.letter == "A");

        expect(wrongLettersA).toHaveLength(1);        
    });    
});
