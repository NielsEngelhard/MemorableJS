"use client"

import PageBase from "@/components/layout/PageBase";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import GameSettingsInputs from "@/features/game/components/create/GameSettingsInputs";

export default function SoloGamePage() {
    return (
        <PageBase>
            <>
                <BasicPageIntro
                    title="Solo Game"
                    subText="Practice at your own pace"
                >

                </BasicPageIntro>
                <GameSettingsInputs gameMode={GameMode.Solo}></GameSettingsInputs> 
            </>
        </PageBase>
    )
}