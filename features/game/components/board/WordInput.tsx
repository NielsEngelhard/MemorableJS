import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/form/TextInput";
import CustomKeyboard from "@/components/ui/keyboard/CustomKeyboard";
import TitleText from "@/components/ui/text/TitleText";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import { useUserSettings } from "@/features/settings/user-settings-context";
import { useActiveGame } from "../../active-game-context";
import Card from "@/components/ui/card/Card";
import KeyboardColorExplanation from "./KeyboardColorExplanation";

interface Props {
    currentGuess: string;
    theWord?: string | undefined | null;
    disabled?: boolean;
    maxLength: number;
    onChange: (value: string) => void;
    onEnter: () => void;
}

export default function WordInput({ theWord, currentGuess, onEnter, onChange, maxLength, disabled = false }: Props) {
    const { wordLength } = useActiveGame();

    const { currentRound } = useActiveGame();
    const { settings } = useUserSettings();

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    function onKeyPress(keyboardKey: string) {
        if (currentGuess.length >= wordLength) return;

        onChange(currentGuess + keyboardKey);
    }

    function onKeyDelete() {
        if (currentGuess.length == 0) return;

        onChange(currentGuess.slice(0, -1));
    }    

    return (
        theWord
        ?
        <TitleText>{theWord}</TitleText>
        :
        settings.showOnScreenKeyboard
        ?
            <Card className="w-full flex flex-col items-center gap-2 p-0 lg:p-4 border-0 md:border-2">
                <CustomKeyboard
                    onKeyPress={onKeyPress}
                    onDelete={onKeyDelete}
                    onEnter={onEnter}
                    correctKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.Correct && l.letter !== undefined).map(l => l.letter as string)}
                    warningKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.Misplaced && l.letter !== undefined).map(l => l.letter as string)}
                    errorKeys={currentRound.guessedLetters.filter(l => l.state == LetterState.Wrong && l.letter !== undefined).map(l => l.letter as string)}
                />
                <KeyboardColorExplanation />
            </Card>
        :
        <div className="w-full lg:px-10 gap-2 flex flex-col">
            <TextInput
                disabled={disabled}
                value={currentGuess}
                maxLength={maxLength}
                centerText={true}
                className="!font-monos flex items-center"
                placeholder="Enter your guess ..."
                supportedSymbols={/^[a-zA-Z]$/}
                onChange={onInputChange}
            />

            <Button className="w-full" onClick={onEnter} disabled={disabled} variant="primary">Guess</Button>
        </div>   
    )
} 