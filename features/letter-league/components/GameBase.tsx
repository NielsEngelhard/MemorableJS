import Card from "@/components/ui/card/Card";
import { ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import GameBoard from "./GameBoard";
import CardBody from "@/components/ui/card/CardBody";

interface Props {
    guesses: ValidatedWord[];
    currentRound: number;
    totalRounds: number;
    totalGuesses: number;
    wordLength: number;
}

// TODO: use provider for game state want anders super veel props
export default function GameBase({ totalRounds, wordLength, totalGuesses, guesses, currentRound }: Props) {
    return (
        <div className="w-full flex lg:grid lg:grid-cols-3 flex-col-reverse gap-10">
            <div className="flex flex-col gap-10">
                <Card>
                    Settings
                </Card>
                <Card>
                    Guessed Letters

                </Card>
                <Card>
                    Game Settings
                </Card>                                
            </div>
            <Card className="col-span-2 w-full">
                <CardBody className="w-full items-center flex">
                    <GameBoard
                        currentRound={currentRound}
                        totalGuesses={totalGuesses}
                        totalRounds={totalRounds}
                        wordLength={wordLength}
                        guesses={guesses}
                    />                    
                </CardBody>
            </Card>
        </div>
    )
}