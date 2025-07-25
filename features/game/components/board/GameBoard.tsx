import LetterRow from "../../../word/components/LetterRow";
import { useEffect, useState } from "react";
import GameModeToText from "@/features/i18n/enum-to-text";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { LETTER_ANIMATION_TIME_MS } from "../../game-constants";
import { ValidatedLetter } from "@/features/word/word-models";
import { useUserSettings } from "@/features/settings/user-settings-context";
import { useActiveGame } from "../../active-game-context";
import WordInput from "./WordInput";
import Badge from "@/components/ui/Badge";

interface Props {

}

export default function GameBoard({  }: Props) {
    const { maxAttemptsPerRound, wordLength, submitGuess, currentRound, totalRounds, gameMode, theWord, players } = useActiveGame();
    const { settings } = useUserSettings();
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [canGuess, setCanGuess] = useState(true);
    const nEmptyRows: number = maxAttemptsPerRound - currentRound.guesses.length - 1;

    useEffect(() => {
        resetCurrentGuess();
    }, [settings.preFillWord, currentRound]);

    function resetCurrentGuess() {
        if (settings.preFillWord) {
            preFillWord();
        } else {
            setCurrentGuess("");
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
            <div className="grid grid-cols-3 text-center mb-2 lg:mb-0">
                <div className="text-start font-bold text-secondary/50">
                    {players.length == 1 && (
                        <span>{players[0].score}pts</span>
                    )}
                </div>
                <div className="font-bold text-xl md:text-3xl">{GameModeToText(gameMode)}</div>
                <div className="flex justify-end items-center"><Badge size="lg">{currentRound.roundNumber} / {totalRounds}</Badge></div>
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