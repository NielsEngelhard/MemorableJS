import { LetterLeagueWordFactory } from "@/features/letter-league/word/word-factory";
import validateLetterLeagueWord from "@/features/letter-league/word/word-validator";

describe("wordValidationAlgorithm_CoreTests", () => {
    it("should not return null with valid input", () => {
        const word = LetterLeagueWordFactory.create("water");
        const result = validateLetterLeagueWord("guess", word);
        expect(result).not.toBeNull();
    });

    test.each([
        ['water', 'water', true],
        ['waterpolo', 'waterpolo', true],
        ['water', 'wator', false],
        ['apple', 'fruit', false],
        ['waterpolo', 'wateryolo', false],
    ])('guess "%s" against actual "%s" returns allCorrect: %s', (guess, actual, expected) => {
        const word = LetterLeagueWordFactory.create(actual);
        const result = validateLetterLeagueWord(guess, word);
        expect(result.allCorrect).toBe(expected);
    });
});
