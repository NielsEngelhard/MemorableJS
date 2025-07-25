import Card from "@/components/ui/card/Card";
import { GameHistoryPlayerModel } from "../models";

interface Props {
    player: GameHistoryPlayerModel;
}

export default function PlayerHistory({ player }: Props) {
    return (
        <Card className="flex flex-row justify-between p-2">
            <div>
                {player.username}
            </div>

            <div className="font-bold">
                {player.score}pts
            </div>
        </Card>
    )
}