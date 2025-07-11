import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { WordFactory } from "@/features/word/word-factory";
import { ValidatedLetter } from "@/features/word/word-models";
import validateLetterLeagueWord from "@/features/word/deprecated-word-validator";

describe("validateUnguessedLetters returns empty array when ", () => {
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
});
