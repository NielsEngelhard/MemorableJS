import LetterRow from "../../../word/components/LetterRow";
import TextInput from "@/components/ui/form/TextInput";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import GameModeToText from "@/features/i18n/enum-to-text";
import TitleText from "@/components/ui/text/TitleText";
import CustomKeyboard from "@/components/ui/keyboard/CustomKeyboard";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { LETTER_ANIMATION_TIME_MS } from "../../game-constants";
import { ValidatedLetter } from "@/features/word/word-models";
import { useUserSettings } from "@/features/settings/user-settings-context";
import { useActiveGame } from "../../active-game-context";

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

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentGuess(event.target.value);
    }

    function onKeyPress(keyboardKey: string) {
        setCurrentGuess(currentGuess + keyboardKey);
    }

    function onKeyDelete() {
        setCurrentGuess((prev) => prev.slice(0, -1));
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
            <div className="w-full items-center flex flex-col p-6 gap-6">

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

                {theWord
                ?
                <TitleText>{theWord}</TitleText>
                :
                settings.showOnScreenKeyboard
                ?
                    <div className="w-full flex flex-col items-center gap-2">
                        <CustomKeyboard
                            onKeyPress={onKeyPress}
                            onDelete={onKeyDelete}
                            onEnter={onSubmit}
                            correctKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.Correct && l.letter !== undefined).map(l => l.letter as string)}
                            warningKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.WrongPosition && l.letter !== undefined).map(l => l.letter as string)}
                            errorKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.Wrong && l.letter !== undefined).map(l => l.letter as string)}
                        />
                    </div>
                :
                <div className="w-full lg:px-10 gap-2 flex flex-col">
                    <TextInput
                        disabled={!canGuess}
                        value={currentGuess}
                        maxLength={wordLength}
                        centerText={true}
                        className="!font-monos flex items-center"
                        placeholder="Enter your guess ..."
                        supportedSymbols={/^[a-zA-Z]$/}
                        onChange={onInputChange}
                    />

                    <Button className="w-full" onClick={onSubmit} disabled={!canGuess} variant="primary">Guess</Button>
                </div>   
                
            }
            </div>            
        </div>
    )
}