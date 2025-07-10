import LetterRow from "../../../word/components/LetterRow";
import { useEffect, useState } from "react";
import GameModeToText from "@/features/i18n/enum-to-text";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { LETTER_ANIMATION_TIME_MS } from "../../game-constants";
import { ValidatedLetter } from "@/features/word/word-models";
import { useUserSettings } from "@/features/settings/user-settings-context";
import { useActiveGame } from "../../active-game-context";
import WordInput from "./WordInput";

interface Props {

}

export default function GameBoard({  }: Props) {
    const { maxAttemptsPerRound, wordLength, submitGuess, currentRound, totalRounds, gameMode, theWord, currentGuessIndex } = useActiveGame();
    const { settings } = useUserSettings();
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [canGuess, setCanGuess] = useState(true);
    const nEmptyRows: number = maxAttemptsPerRound - currentRound.guesses.length - 1;

    useEffect(() => {
        resetCurrentGuess();
    }, []);

    function resetCurrentGuess() {
        if (settings.preFillWord) {
            preFillWord();
        }
    }

    function preFillWord() {
        var preFill = "";

        for(var i=0; i<wordLength; i++) {
            const correctGuess = currentRound.guessedLetters.find(l => l.position == i+1 && l.state == LetterState.Correct);
            if (!correctGuess || !correctGuess.letter) break;         
            
            preFill += correctGuess.letter;
        }

        setCurrentGuess(preFill);
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



    async function onSubmit() {
        if (currentGuess.length != wordLength) return;

        setCanGuess(false);
        await submitGuess(currentGuess);
        resetCurrentGuess();

        setTimeout(() => {
            setCanGuess(true);
        }, LETTER_ANIMATION_TIME_MS * wordLength);
    }

    return (
        <div className="w-full">
            
            {/* Header section */}
            <div className="flex flex-col text-center">
                <div className="font-bold text-3xl">{GameModeToText(gameMode)}</div>
                <div className="flex flex-row text-md text-foreground-muted justify-center gap-2">
                    <div>Round {currentRound.roundNumber}/{totalRounds}</div>
                    <div>Guess {currentGuessIndex}/{maxAttemptsPerRound}</div>
                </div>                
            </div>

            {/* Body */}
            <div className="w-full items-center flex flex-col lg:p-6 gap-6">

                {/* Rows */}
                <div className="flex flex-col gap-2">
                    {/* Previous guesses */}
                    {displayPreviousGuesses()}

                    {/* Current guess */}
                    {currentRound.guesses.length < maxAttemptsPerRound && displayCurrentGuess()}

                    {/* Empty Rows */}
                    {Array.from({ length: nEmptyRows }, (_, index) => (
                        displayEmptyRow(index)
                    ))}
                </div>

                    <WordInput
                        theWord={theWord}
                        currentGuess={currentGuess}
                        maxLength={wordLength}
                        onChange={setCurrentGuess}
                        onEnter={onSubmit}
                        disabled={!canGuess}                        
                    />
            </div>            
        </div>
    )
}