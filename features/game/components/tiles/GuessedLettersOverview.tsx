import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { LetterText } from "lucide-react";
import { useEffect, useState } from "react";
import { LetterState } from "@/drizzle/schema/enum/letter-state";
import LetterTile from "@/features/word/components/LetterTile";
import { useActiveGame } from "../../active-game-context";

export default function GuessedLettersOverview() {
    const { currentRound } = useActiveGame();

    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [wrongLetters, setWrongLetters] = useState<string[]>([]);
    const [wrongPositionLetters, setWrongPositionLetters] = useState<string[]>([]);

    // POC kijken of ik overal hier moet subscriben mbt depedency en of dit het echt gaat updaten
    useEffect(() => {
        setCorrectLetters([...new Set(
        currentRound.guessedLetters
            .filter(l => l.state == LetterState.Correct && l.letter != undefined)
            .map(l => l.letter ?? "")
        )]);
        setWrongLetters(currentRound.guessedLetters.filter(l => l.state == LetterState.Wrong && l.letter != undefined).map(l => l.letter ?? ""));
        setWrongPositionLetters(currentRound.guessedLetters.filter(l => l.state == LetterState.WrongPosition && l.letter != undefined).map(l => l.letter ?? ""));
    }, [currentRound]);

    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText
                    text="Letters"
                    Icon={LetterText}
                />

                <div className="flex flex-col gap-2">
                    {(correctLetters && correctLetters.length > 0) && (
                        <div className="flex gap-2">
                            {correctLetters.map((value, index) => (
                                <LetterTile
                                    key={`correct-${index}`}
                                    letter={value}
                                    state={LetterState.Correct}
                                    variant="small"
                                />
                            ))}                        
                        </div>                        
                    )}

                    {(wrongPositionLetters && wrongPositionLetters.length > 0) && (
                        <div className="flex gap-2">
                            {wrongPositionLetters.map((value, index) => (
                                <LetterTile
                                    key={`wrongpos-${index}`}
                                    letter={value}
                                    state={LetterState.WrongPosition}
                                    variant="small"
                                />
                            ))}                        
                        </div>                        
                    )}

                    {(wrongLetters && wrongLetters.length > 0) && (
                        <div className="flex gap-2">
                            {wrongLetters.map((value, index) => (
                                <LetterTile
                                    key={`wrong-${index}`}
                                    letter={value}
                                    state={LetterState.Wrong}
                                    variant="small"
                                />
                            ))}                        
                        </div>                        
                    )}
                </div>
            </CardBody>
        </Card>            
    )
}