"use client"

import PageBase from "@/components/layout/PageBase";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import CreateGameForm from "@/features/game/components/create/CreateGameForm";

export default function SoloGamePage() {
    return (
        <PageBase>
            <CreateGameForm gameMode={GameMode.Solo}></CreateGameForm>
        </PageBase>
    )
}