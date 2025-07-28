import { Crown, Router, Rss } from "lucide-react";
import { MpLobbyPlayerModel } from "../models";
import Button from "@/components/ui/Button";

interface Props {
    player: MpLobbyPlayerModel;
    isHost: boolean;
}

export default function MpLobbyPlayerRow({ player, isHost }: Props) {
    const connected = true;

    return (
        <div className="flex gap-2 items-center justify-between">            
            {/* Start */}
            <div className="flex gap-2 items-center justify-between">
                {/* Image/Color */}
                <div className="w-4 h-4 rounded-full" style={player.colorHex ? { backgroundColor: player.colorHex } : { backgroundColor: "var(--primary)" }}>

                </div>

                {/* IsHost */}
                {isHost && (
                    <Crown className="text-amber-300" size={16} />
                )}            

                {/* Name */}
                <div className="font-medium">
                    {player.username}
                </div>

                {/* ConnectionStatus */}
                <div>
                    {connected ? (
                        <Router className="text-success" size={16} />
                    ) : (
                        <Rss className="text-error" size={16} />
                    )}
                </div>            
            </div>        

            {/* End */}
            <div>
                {/* <Button size="sm" variant="error">Kick</Button> */}
            </div>
        </div>
    )
}