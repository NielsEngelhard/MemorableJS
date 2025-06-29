import { LetterLeagueWordFactory } from "@/features/letter-league/word/word-factory";
import validateLetterLeagueWord from "@/features/letter-league/word/word-validator";

describe("wordValidationAlgorithm_CoreTests", () => {
    it("should not return null with valid input", () => {
        const word = LetterLeagueWordFactory.create("water");
        const result = validateLetterLeagueWord("guess", word);
        expect(result).not.toBeNull();
    });

    it("should return all correct when the guess is correct", () => {
        const word = LetterLeagueWordFactory.create("klonten");
        const result = validateLetterLeagueWord("klonten", word);
        expect(result.allCorrect).toBe(true);
    });

    test.each([
        ['water', 'guess', true],
        ['abcde', 'fhijg', false],
        ['apple', 'fruit', true],
    ])('should not return allcorrect when the guess is not entirely correct', (guess, actual) => {
        const word = LetterLeagueWordFactory.create(actual);
        const result = validateLetterLeagueWord(guess, word);
        expect(result.allCorrect).toBe(false);
    });
});
