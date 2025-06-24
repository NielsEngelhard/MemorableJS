import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";
import LetterRow from "../word/components/LetterRow";
import TextInput from "@/components/ui/form/TextInput";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useLetterLeagueGame } from "../letter-league-game-context";
import GameModeToText from "@/features/i18n/enum-to-text";

interface Props {

}

export default function GameBoard({  }: Props) {
    const { maxAttemptsPerRound, wordLength, submitGuess, currentRound, totalRounds, gameMode } = useLetterLeagueGame();
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const nEmptyRows: number = maxAttemptsPerRound - currentRound.guesses.length - 1;

    useEffect(() => {
        resetCurrentGuess();
    }, []);

    function resetCurrentGuess() {
        setCurrentGuess(currentRound.guessedLetters.find(l => l.position == 1)?.letter ?? "");
    }

    function displayEmptyRow(index: number) {
        const letters: ValidatedLetter[] = Array(wordLength).fill({});

        return (
            <LetterRow key={index} letters={letters} />
        )
    }

    function displayCurrentGuess() {
        let letters: ValidatedLetter[] = [];
        for(var i=0; i<wordLength; i++) {
            const position = i+1;
            // Empty
            if (currentGuess.length < position) {
                letters = [...letters, ...[{ position: position }]];
   
            // Typed letter
            } else {
                letters = [...letters, ...[{ position: position, letter: currentGuess[i] }]];
            }
        }
        return (
            <LetterRow key="currentguess" letters={letters} />
        )
    }

    function displayPreviousGuesses() {
        return (
            <>
                {currentRound.guesses.map((value, i) => (
                    <LetterRow key={`guess-${i}`} letters={value.letters} animate={currentRound.guesses.length-1 == i} />
                ))}
            </>
        )
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentGuess(event.target.value);
    }

    async function onSubmit() {
        await submitGuess(currentGuess);
        resetCurrentGuess();
    }

    return (
        <div className="w-full">
            
            {/* Header section */}
            <div className="flex flex-col text-center">
                <div className="font-bold text-3xl">{GameModeToText(gameMode)}</div>
                <div className="flex flex-row text-md text-foreground-muted justify-center gap-2">
                    <div>Round {currentRound.roundNumber}/{totalRounds}</div>
                    <div>Guess {currentRound.guesses.length}/{maxAttemptsPerRound}</div>
                </div>
            </div>

            {/* Body */}
            <div className="w-full items-center flex flex-col p-6 gap-6">

                {/* Rows */}
                <div className="flex flex-col gap-2">
                    {/* Previous guesses */}
                    {displayPreviousGuesses()}

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
                        value={currentGuess}
                        maxLength={wordLength}
                        centerText={true}
                        className="!font-monos flex items-center"
                        placeholder="Enter your guess ..."
                        supportedSymbols={/^[a-zA-Z]$/}
                        onChange={onInputChange}
                    />

                    <Button className="w-full" onClick={onSubmit}>Guess</Button>
                </div>            
            </div>            
        </div>
    )
}