"use client"
import PageBase from "@/components/layout/PageBase";
import GameBase from "@/features/letter-league/components/GameBase";
import { LetterLeagueGameProvider } from "@/features/letter-league/letter-league-game-context";
import { useParams } from "next/navigation";

export default function PlayLetterLeagueGame() {
    const params = useParams();
    const slug = params.slug;
    
    return (
        <PageBase>
            {/* hello {slug} */}
           <LetterLeagueGameProvider _currentRound={1} _totalRounds={6}>
                <GameBase guesses={[]} currentRound={1} totalGuesses={6} totalRounds={4} wordLength={6}></GameBase>            
            </LetterLeagueGameProvider>           
        </PageBase>
    )
}