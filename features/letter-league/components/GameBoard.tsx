import { ValidatedLetter, ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import LetterRow from "../word/components/LetterRow";
import TextInput from "@/components/ui/form/TextInput";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { LetterState } from "@/drizzle/schema/enum/letter-state";

interface Props {
    guesses: ValidatedWord[];
    currentRound: number;
    totalRounds: number;
    totalGuesses: number;
    wordLength: number;
}

export default function GameBoard({ totalRounds, wordLength, totalGuesses, guesses }: Props) {
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const nEmptyRows: number = totalGuesses - guesses.length - 1;

    function displayEmptyRow(index: number) {
        const letters: ValidatedLetter[] = Array(wordLength).fill({});

        return (
            <LetterRow key={index} letters={letters} />
        )
    }

    function displayCurrentGuess() {
        const letters: ValidatedLetter[] = [...currentGuess.split("").map((char, index) => ({
            letter: char
        })), ...Array(wordLength - currentGuess.length).fill({})];

        return (
            <div>
                <LetterRow key="currentguess" letters={letters} />
            </div>
        )
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentGuess(event.target.value);
    }

    return (
        <div className="w-full items-center flex flex-col p-6 gap-6">

            {/* Rows */}
            <div className="flex flex-col gap-2">
                {/* Previous guesses */}
                <div>

                </div>

                {/* Current guess */}
                {displayCurrentGuess()}

                {/* Empty Rows */}
                {Array.from({ length: nEmptyRows }, (_, index) => (
                    displayEmptyRow(index)
                ))}
            </div>

            {/* Keyboard/Input */}
            <div className="w-full lg:px-10 gap-2 flex flex-col">
                <TextInput
                    maxLength={wordLength}
                    centerText={true}
                    className="!font-monos flex items-center"
                    placeholder="Enter your guess ..."
                    supportedSymbols={/^[a-zA-Z]$/}
                    onChange={onInputChange}
                />

                <Button className="w-full">Guess</Button>
            </div>            
        </div>
    )
}