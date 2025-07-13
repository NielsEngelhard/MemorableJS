"use client";

import PageBase from "@/components/layout/PageBase";
import GetGameHistory from "@/features/history/actions/query/get-game-history";
import PlayedGameOverview from "@/features/history/components/PlayedGameOverview";
import { GameHistoryModel } from "@/features/history/models";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GameHistoryPage() {
    const [gameHistory, setGameHistory] = useState<GameHistoryModel | undefined>(undefined);

    const params = useParams();
    const gameHistoryId = params.gameHistoryId;

    useEffect(() => {
        async function GetGame() {
            if (!gameHistoryId) return;
            var resp = await GetGameHistory(gameHistoryId.toString());

            if (!resp) redirect("/play");
            setGameHistory(resp);
        }

        GetGame();
    }, [gameHistoryId]);    

    return (
        <PageBase>
            {gameHistory ? (
                <PlayedGameOverview gameHistory={gameHistory} />
            ) : (
                <div>Loading...</div>
            )}
        </PageBase>
    )
}