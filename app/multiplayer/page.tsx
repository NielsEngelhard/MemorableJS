"use client"

import PageBase from "@/components/layout/PageBase";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import CreateLobbyCard from "@/features/mp-lobby/components/CreateLobbyCard";
import JoinLobbyCard from "@/features/mp-lobby/components/JoinLobbyCard";

export default function MultiplayerPage() {
    return (
        <PageBase>
            <BasicPageIntro
                title="Multiplayer"
                subText="Join or Create a multiplayer game"
                color="secondary"
            />

            <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                <div>
                    <JoinLobbyCard />
                </div>
                <div>
                    <CreateLobbyCard />
                </div>
            </div>
        </PageBase>
    )
}