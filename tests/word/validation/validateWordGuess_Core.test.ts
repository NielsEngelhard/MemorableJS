import { WordFactory } from "@/features/word/word-factory";
import validateWordGuess from "@/features/word/word-validator";

describe("wordValidationAlgorithm_CoreTests", () => {
    it("should not return null with valid input", () => {
        const word = WordFactory.create("water");
        const result = validateWordGuess("guess", word);
        expect(result).not.toBeNull();
    });

    test.each([
        ['water', 'water', true],
        ['waterpolo', 'waterpolo', true],
        ['water', 'wator', false],
        ['apple', 'fruit', false],
        ['waterpolo', 'wateryolo', false],
    ])('guess "%s" against actual "%s" returns allCorrect: %s', (guess, actual, expected) => {
        const word = WordFactory.create(actual);
        const result = validateWordGuess(guess, word);
        expect(result.allCorrect).toBe(expected);
    });
});
