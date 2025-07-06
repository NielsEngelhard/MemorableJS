"use client"
import PageBase from "@/components/layout/PageBase";
import { LetterLeagueGameProvider } from "@/features/active-game/letter-league-game-context";
import { LetterLeagueGame } from "@/features/active-game/schemas";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameBase from "@/features/active-game/components/tiles/GameBase";
import { GetLetterLeagueGame } from "@/features/active-game/actions";

export default function PlayLetterLeagueGame() {
    const [game, setGame] = useState<LetterLeagueGame | undefined>(undefined);

    const params = useParams();
    const slug = params.slug;
    
    useEffect(() => {
        async function GetGame() {
            if (!slug) return;
            var resp = await GetLetterLeagueGame(slug.toString());

            if (!resp) redirect("/letter-league");
            setGame(resp);
        }

        GetGame();
    }, [slug]);

    return (
        <PageBase>
            {game ? (
            <LetterLeagueGameProvider
                game={game}
            >
                <GameBase />          
            </LetterLeagueGameProvider>                 
            ) : (
                <div>loading...</div>
            )}          
        </PageBase>
    )
}