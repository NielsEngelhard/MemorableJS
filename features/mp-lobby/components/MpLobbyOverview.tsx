import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import { MpLobbyModel } from "../models"
import { addHyphenInMiddle } from "@/lib/string-util";
import GameSettingsInputs from "@/features/game/components/create/GameSettingsInputs";
import { GameMode } from "@/drizzle/schema";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import Button from "@/components/ui/Button";
import { Play } from "lucide-react";
import MpLobbyPlayerRow from "./MpLobbyPlayerRow";

interface Props {
    lobby: MpLobbyModel;
}

export default function MpLobbyOverview({ lobby }: Props) {
    return (
        <>
            <BasicPageIntro
                title="Multiplayer Lobby"
                subText="Configure a multiplayer game. Players can join with code:"
                color="secondary"
            >
                <div className="text-2xl font-mono font-bold text-primary">
                    {addHyphenInMiddle(lobby.id)}
                </div>
            </BasicPageIntro>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-full">
                <GameSettingsInputs gameMode={GameMode.Multiplayer}>
                    <div className="flex flex-col gap-2 lg:gap-4">
                        <Card>
                            <CardBody className="">
                                <>
                                    <div className="font-bold text-lg">Players</div>
                                    {lobby.players.map((player, i) => {
                                        return <MpLobbyPlayerRow key={i} player={player} isHost={player.id == lobby.hostId} />
                                    })}
                                </>
                            </CardBody>
                        </Card>

                        <Button variant="primary" className="py-4" type="submit">
                            <Play size={16} />
                            Start Game
                        </Button>
                    </div>                    
                </GameSettingsInputs> 
            </div>
        </>
    )
}