import { WordValidator } from "@/features/word/word-validator";

describe("is correct in response", () => {
    it("should return isCorrect=TRUE when the word is guessed", () => {
        const actualWord = "banaan";
        const guess      = "banaan";

        const result = WordValidator.validateAndFilter(guess, actualWord, []);

        expect(result.isCorrect).toBe(true);    
    });

    it("should return isCorrect=FALSE when the word is NOT guessed", () => {
        const actualWord = "banaan";
        const guess      = "banaen";

        const result = WordValidator.validateAndFilter(guess, actualWord, []);

        expect(result.isCorrect).toBe(false);    
    });    
});
