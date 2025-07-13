import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import { GameHistoryRoundModel } from "../models";

interface Props {
    round: GameHistoryRoundModel;
}

export default function RoundHistory({ round }: Props) {
    return (
        <Card className="bg-accent/5">
            <CardBody>

                {/* Top */}
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="primaryLight">Round {round.index}</Badge>
                        <div className="font-mono font-bold">{round.word}</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold text-lg">{round.points} pts</div>
                        {round.wordGuessed ? (
                            <div className="text-sm text-success font-medium">SOLVED</div>
                        ) : (
                            <div className="text-sm text-error font-medium">UNSOLVED</div>
                        )}
                    </div>
                </div>

                {/* Guesses */}
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-foreground-muted">Guesses:</div>
                    <div className="flex flex-row gap-2">
                        {round.guesses.map((guess, index) => {
                            return (
                                <div className="text-sm border-1 border-border p-1 md:p-2 bg-secondary/10 rounded-md font-mono font-medium" key={`rh-${index}`}>
                                    {guess}
                                </div>                                  
                            )                           
                        })}
                    </div>
                </div>

            </CardBody>
        </Card>
    )
}