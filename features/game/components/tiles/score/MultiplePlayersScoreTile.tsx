import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { GamePlayerModel } from "@/features/game/models";

interface Props {
    players: GamePlayerModel[];
}

export default function MultiplePlayersScoreTile({players} : Props) {
    return (
        <Card variant="fade">
            <CardBody className="p-2 lg:p-6 items-center text-primary !gap-0">
                <SubTitleText
                    text="Score"
                />   
                <div className="font-bold text-2xl">
                    TODO
                </div>

                <div>
                    points
                </div>
            </CardBody>
        </Card>
    )
}