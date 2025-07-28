"use client"

import PageBase from "@/components/layout/PageBase";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import GameSettingsInputs from "@/features/game/components/create/GameSettingsInputs";
import { Play } from "lucide-react";

export default function SoloGamePage() {
    return (
        <PageBase>
            <>
                <BasicPageIntro
                    title="Solo Game"
                    subText="Practice at your own pace"
                >

                </BasicPageIntro>
                <GameSettingsInputs gameMode={GameMode.Solo}>
                    <div className="flex flex-col gap-2 lg:gap-4">
                        <Card>
                            <CardBody className="">
                                <>
                                    <p className="font-bold text-lg">Ready to Play?</p>
                                    <div className="text-foreground-muted">Your game is configured and ready to start!</div>

                                    <ul className="text-foreground-muted text-sm">
                                        {/* <li>• {form.getValues("totalRounds")} rounds</li>
                                        <li>• {form.getValues("wordLength")} letters per word</li>
                                        <li>• {form.getValues("maxAttemptsPerRound")} attempts per round</li> */}
                                    </ul>
                                </>
                            </CardBody>
                        </Card>

                        <Button variant="primary" className="py-4" type="submit">
                            <Play size={16} />
                            Start Game
                        </Button>
                    </div>                    
                </GameSettingsInputs> 
            </>
        </PageBase>
    )
}