import { ValidatedLetter, ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import LetterRow from "../word/components/LetterRow";
import TextInput from "@/components/ui/form/TextInput";
import Button from "@/components/ui/Button";

interface Props {
    guesses: ValidatedWord[];
    currentRound: number;
    totalRounds: number;
    totalGuesses: number;
    wordLength: number;
}

export default function GameBoard({ totalRounds, wordLength, totalGuesses, guesses }: Props) {
    const nEmptyRows: number = totalGuesses - guesses.length;

    function displayEmptyRow(index: number) {
        const letters: ValidatedLetter[] = Array(wordLength).fill({});

        return (
            <LetterRow key={index} letters={letters} />
        )
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("Input changed:", event.target.value);
    }

    return (
        <div className="w-full items-center flex flex-col p-6 gap-6">
            {/* Board */}
            <div className="flex flex-col gap-2">
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