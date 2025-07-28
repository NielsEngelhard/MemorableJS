import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateMpLobby from "../actions/command/CreateMpLobby";
import { redirect } from "next/navigation";
import { MP_LOBBY_ROUTE } from "@/lib/routes";

export default function CreateLobbyCard() {
    const [isLoading, setIsLoading] = useState(false);

    function createLobby() {
        setIsLoading(true);

        CreateMpLobby()
        .then((resp) => {
            redirect(MP_LOBBY_ROUTE(resp.id));
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Card>
            <CardBody>
                <TextWithIcon Icon={Plus}>
                    Create Lobby
                </TextWithIcon>     

                <p className="text-foreground-muted">Set up a new multiplayer game with your preferred settings. Other people can join this lobby.</p>        

                <Button variant="secondary" onClick={createLobby} disabled={isLoading}>
                    Create Lobby    
                </Button>          
            </CardBody>
        </Card>            
    )
}