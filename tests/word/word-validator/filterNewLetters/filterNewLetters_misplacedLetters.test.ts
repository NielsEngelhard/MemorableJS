import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { ValidatedLetter } from "@/features/word/word-models";
import { WordValidator } from "@/features/word/word-validator";

describe("filterNewLetters correct letters", () => {
    it("should filter correct letters that were not already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "J", position: 1, state: LetterState.Correct },
            { letter: "O", position: 2, state: LetterState.Wrong },
            { letter: "O", position: 3, state: LetterState.Wrong },
            { letter: "P", position: 4, state: LetterState.Correct }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "W", state: LetterState.Wrong }
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "J", state: LetterState.Correct, position: 1 }),
                expect.objectContaining({ letter: "P", state: LetterState.Correct, position: 4 }),
            ])
        );        
    });

    it("should not filter correct letters that were already guessed", () => {
        const validatedGuess: ValidatedLetter[] = [
            { letter: "K", position: 1, state: LetterState.Correct },
            { letter: "L", position: 2, state: LetterState.Wrong },
            { letter: "O", position: 3, state: LetterState.Wrong },
            { letter: "S", position: 4, state: LetterState.Correct }
        ];

        const previouslyGuessedLetters: ValidatedLetter[] = [
            { letter: "K", state: LetterState.Correct }
        ];

        const result = WordValidator.filterNewLetters(validatedGuess, previouslyGuessedLetters);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "S", state: LetterState.Correct, position: 4 }),
            ])
        );       
    });
});
