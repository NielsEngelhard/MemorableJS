import { LetterLeagueWordFactory } from "@/features/letter-league/word/word-factory";
import validateLetterLeagueWord from "@/features/letter-league/word/word-validator";

describe("wordValidationAlgorithm", () => {
    it("should not return null with valid input", () => {
        const word = LetterLeagueWordFactory.create("water");
        const result = validateLetterLeagueWord("guess", word);
        expect(result).not.toBeNull();
    });
});
