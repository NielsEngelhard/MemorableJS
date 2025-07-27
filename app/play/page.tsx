"use client"

import PageBase from "@/components/layout/PageBase";
import { useAuth } from "@/features/auth/auth-context";
import { GetAllGameTeasersForUser } from "@/features/game/actions/query/get-all-game-teasers-for-user";
import ActiveGamesList from "@/features/game/components/active/active-games-list";
import { GameModeCard } from "@/features/game/components/game-modes/GameModeCard";
import PlayHeader from "@/features/game/components/game-modes/PlayHeader";
import { GameTeaserModel } from "@/features/game/models";
import { User, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function GameModesPage() {
    const { user } = useAuth();
    const [activeGames, setActiveGames] = useState<GameTeaserModel[]>();

    useEffect(() => {
        if (!user) return; 

        GetAllGameTeasersForUser(user?.id)
            .then((result) => {
                setActiveGames(result);
            })
            .catch(() => {
                setActiveGames([]);
            })        
    }, [user]);

    return (
        <PageBase>
            <PlayHeader />

            <ActiveGamesList activeGames={activeGames} />

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
                <GameModeCard
                    name="Solo Game"
                    Icon={User}
                    bgColor="bg-primary/20"
                    color="text-primary/80"
                    description="Practice your word skills in a relaxed single-player environment. Perfect for honing your strategy."
                    players="1 player"
                    time="5-10 min"
                    href="/solo"
                />

                <GameModeCard
                    name="Multiplayers Game"
                    Icon={Users}
                    bgColor="bg-secondary/20"
                    color="text-secondary/80"
                    description="Challenge friends or join random players in competitive word battles. Test your speed and vocabulary."
                    players="2-6 players"
                    time="10-20 min"
                    href="/multiplayer"
                />    
            </div>
        </PageBase>
    )
}