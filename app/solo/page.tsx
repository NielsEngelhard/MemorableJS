"use client"

import PageBase from "@/components/layout/PageBase";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import GameSettingsInputs from "@/features/game/components/create/GameSettingsInputs";

export default function SoloGamePage() {
    return (
        <PageBase>
            <GameSettingsInputs gameMode={GameMode.Solo}></GameSettingsInputs>
        </PageBase>
    )
}