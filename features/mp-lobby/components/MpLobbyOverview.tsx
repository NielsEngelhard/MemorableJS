import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import { MpLobbyModel } from "../models"
import { addHyphenInMiddle } from "@/lib/string-util";
import GameSettingsInputs from "@/features/game/components/create/GameSettingsInputs";
import { GameMode } from "@/drizzle/schema";

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

                </GameSettingsInputs>
            </div>
        </>
    )
}