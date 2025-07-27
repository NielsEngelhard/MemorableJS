import Card from "@/components/ui/card/Card";
import { GameTeaserModel } from "../../models";
import CardBody from "@/components/ui/card/CardBody";
import { GameModeFactory } from "../game-modes/GameModeStrategy";
import Button from "@/components/ui/Button";
import { Clock } from "lucide-react";
import Link from "next/link";
import { IN_GAME_ROUTE } from "@/lib/routes";
import ConfirmationDialog from "@/components/ui/popup/ConfirmationDialog";
import { useState } from "react";

interface Props {
    activeGame: GameTeaserModel;
}

export default function ActiveGameCard({ activeGame }: Props) {
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

    const gameModeData = GameModeFactory.get(activeGame.gameMode);

    async function deleteItem() {

    }

    return (
        <Card className="w-full">
            <CardBody className="flex items-center flex-row justify-between w-full">
                {/* Left */}
                <div className="flex flex-row gap-2">
                    <gameModeData.Icon></gameModeData.Icon>

                    <span>{gameModeData.name}</span>
                    <div className="flex items-center gap-0.5 hidden lg:flex">
                        <Clock size={10} />
                        <span className="text-xs">{activeGame.createdAt.toDateString()}</span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-row gap-2 items-center">
                    <div className="text-sm text-foreground-muted gap-2 flex-row hidden lg:flex">
                        <span>Round {activeGame.currentRoundIndex}/{activeGame.totalRounds}</span>
                    </div>

                    <Link href={IN_GAME_ROUTE(activeGame.id)}>
                        <Button variant="success" size="sm">
                            Continue
                        </Button>                    
                    </Link>

                    <Button variant="error" size="sm" onClick={() => {setDeleteDialogIsOpen(true)}}>
                        Abandon
                    </Button>                      
                </div>
            </CardBody>

            <ConfirmationDialog isOpen={deleteDialogIsOpen} onClose={() => setDeleteDialogIsOpen(false)} onConfirm={deleteItem} />
        </Card>
    )
}