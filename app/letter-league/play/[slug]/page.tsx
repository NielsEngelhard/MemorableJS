"use client"
import PageBase from "@/components/layout/PageBase";
import { GetLetterLeagueGame } from "@/features/letter-league/actions";
import GameBase from "@/features/letter-league/components/GameBase";
import { LetterLeagueGameProvider } from "@/features/letter-league/letter-league-game-context";
import { LetterLeagueGame } from "@/features/letter-league/schemas";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

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