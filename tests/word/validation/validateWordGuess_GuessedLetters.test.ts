import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { WordFactory } from "@/features/word/word-factory";
import { ValidatedLetter } from "@/features/word/word-models";
import validateLetterLeagueWord from "@/features/word/word-validator";

describe("wordValidationAlgorithm_GuessedLettersTests", () => {
    it("should return only the new entry that was not already guessed", () => {
        const actual = WordFactory.create("water");
        actual.letters[0].guessed = true;  // w w
        actual.letters[1].guessed = true;  // a a
        actual.letters[2].guessed = false; // t f <-- f should be a new incorrect
        actual.letters[3].guessed = true;  // e e
        actual.letters[4].guessed = false; // r r <-- r should be a new correct

        let guessedLetters: ValidatedLetter[] = [];
        const result = validateLetterLeagueWord("wafer", actual, guessedLetters);

        expect(guessedLetters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "f", state: LetterState.Wrong }),
                expect.objectContaining({ letter: "r", state: LetterState.Correct, position: 5 }),
            ])
        );
    });

    it("guessedletters should contain all letters of the word if the guess is correct", () => {
        // Arrange
        let guessedLetters: ValidatedLetter[] = [];
        const previousWord = WordFactory.create("water");
        previousWord.letters.forEach(letter => letter.guessed = true);

        // Act
        const result = validateLetterLeagueWord("water", previousWord, guessedLetters);

        // Assert
        expect(guessedLetters).toHaveLength(5);
    });   
    
    it("guessedletters should not add any duplicate values to the guessed letters", () => {
        // Arrange
        let guessedLetters: ValidatedLetter[] = [];
        const previousWord = WordFactory.create("rataplan");
        previousWord.letters.forEach(letter => letter.guessed = true);

        // Act
        const result = validateLetterLeagueWord("rataplan", previousWord, guessedLetters);

        // Assert
        // Check that each unique letter appears only once in guessedLetters
        const letterCounts = guessedLetters.reduce((counts, letter) => {
            const key = `${letter.letter}-${letter.state}`;
            counts[key] = (counts[key] || 0) + 1;
            return counts;
        }, {} as Record<string, number>);
        
        const duplicates = Object.values(letterCounts).filter(count => count > 1);
        expect(duplicates).toHaveLength(0);
        
        // Or alternatively, check that the length equals unique combinations
        const uniqueKeys = new Set(guessedLetters.map(l => `${l.letter}-${l.state}`));
        expect(guessedLetters).toHaveLength(uniqueKeys.size);
    });  

    it("guessedletters should not remove earlier correct letter", () => {
        // Arrange
        let guessedLetters: ValidatedLetter[] = [{ letter: 'd', position: 1, state: LetterState.Correct }];
        const actualWord = WordFactory.create("daarin");
        const guess = "donder";

        // Act
        validateLetterLeagueWord(guess, actualWord, guessedLetters);

        // Assert
        expect(guessedLetters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "d", state: LetterState.Correct, position: 1 }),
            ])
        );
    });

    it("guessedletters can contain duplicate letter between states CORRECT and WRONG_POSITION", () => {
        // Arrange
        const actualWord = WordFactory.create("daarin");
        const guess = "dantar";

        // First A is guessed but the second is not
        let guessedLetters: ValidatedLetter[] = [{ letter: 'a', position: 2, state: LetterState.Correct }];

        // Act
        validateLetterLeagueWord(guess, actualWord, guessedLetters);

        // Assert
        expect(guessedLetters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "a", state: LetterState.Correct, position: 2 }),
                expect.objectContaining({ letter: "a", state: LetterState.WrongPosition }),
            ])
        );
    });
    
    it("guessedletters removes letter from WRONG_POSITION if guessed and does not occur anymore", () => {
        // Arrange
        const actualWord = WordFactory.create("aabbcc");
        const guess = "aaaaaa";

        // A was wrong position but now all a's are guessed - so it should remove it from wrong_position
        let guessedLetters: ValidatedLetter[] = [{ letter: 'a', state: LetterState.WrongPosition }];

        // Act
        validateLetterLeagueWord(guess, actualWord, guessedLetters);

        // Assert

        // All a's are guessed so it should remove it from wrong position
        expect(guessedLetters).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({ letter: 'a', state: LetterState.WrongPosition }),
            ])
        );
    });     
    
    it("guessedletters does not remove letter from WRONG_POSITION if guessed and there still is a unguessed position of that letter", () => {
        // Arrange
        const actualWord = WordFactory.create("bbbaaa");
        const guess = "bbaaaa";

        // 'b' was wrong position and a b is guessed, but still there still is an unguessed 'b' letter
        let guessedLetters: ValidatedLetter[] = [{ letter: 'b', state: LetterState.WrongPosition }];

        // Act
        validateLetterLeagueWord(guess, actualWord, guessedLetters);

        // Assert

        // All a's are guessed so it should remove it from wrong position
        expect(guessedLetters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: 'b', state: LetterState.WrongPosition }),
            ])
        );
    });   
    
    it("guessedletters can have multiple CORRECT letters with the same letter, but on a different position", () => {
        // Arrange
        const actualWord = WordFactory.create("aabbcc");
        const guess = "aaaaaa";

        // A was wrong position but now all a's are guessed - so it should remove it from wrong_position
        let guessedLetters: ValidatedLetter[] = [{ letter: 'a', state: LetterState.WrongPosition }];

        // Act
        validateLetterLeagueWord(guess, actualWord, guessedLetters);

        // Assert
        expect(guessedLetters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ letter: "a", state: LetterState.Correct, position: 1 }),
                expect.objectContaining({ letter: "a", state: LetterState.Correct, position: 2 }),
            ])
        );
    });   
});
