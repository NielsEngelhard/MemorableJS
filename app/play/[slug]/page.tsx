"use client"
import PageBase from "@/components/layout/PageBase";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameBase from "@/features/game/components/tiles/GameBase";
import { GameModel } from "@/features/game/models";
import { GetGameById } from "@/features/game/actions/query/get-game-by-id";
import { ActiveGameProvider } from "@/features/game/active-game-context";

export default function PlayGame() {
    const [game, setGame] = useState<GameModel | undefined>(undefined);

    const params = useParams();
    const slug = params.slug;
    
    useEffect(() => {
        async function GetGame() {
            if (!slug) return;
            
            try {
                var resp = await GetGameById(slug.toString());
                if (!resp) redirect("/play");
                setGame(resp);                
            } catch {
                redirect("/profile");
            }
        }

        GetGame();
    }, [slug]);

    return (
        <PageBase>
            {game ? (
            <ActiveGameProvider
                game={game}
            >
                <GameBase />          
            </ActiveGameProvider>                 
            ) : (
                <div>loading...</div>
            )}          
        </PageBase>
    )
}