"use client"
import PageBase from "@/components/layout/PageBase";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameBase from "@/features/game/components/tiles/GameBase";
import { GameModel } from "@/features/game/models";
import { GetGameById } from "@/features/game/actions/query/get-game-by-id";
import { ActiveGameProvider } from "@/features/game/active-game-context";
import { useAuth } from "@/features/auth/auth-context";
import getWod from "@/features/word-of-the-day/actions/query/get-or-create-wod-game";
import GetOrCreateWodGame from "@/features/word-of-the-day/actions/query/get-or-create-wod-game";
import { WORD_OF_THE_DAY_ROUTE } from "@/lib/routes";

export default function PlayWordOfTheDay() {
    const router = useRouter();
    const [game, setGame] = useState<GameModel | null>(null);
    const { user } = useAuth();

    
    useEffect(() => {
        async function GetGame() {
            if (!user) return;
            
            try {
                var resp = await GetOrCreateWodGame(user.id);
                debugger;
                if (resp == null || resp == undefined) router.push(WORD_OF_THE_DAY_ROUTE);
                setGame(resp);                
            } catch {
                redirect(WORD_OF_THE_DAY_ROUTE);
            }
        }

        GetGame();
    }, [user]);

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