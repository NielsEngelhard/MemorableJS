"use client"
import PageBase from "@/components/layout/PageBase";
import { GameMode } from "@/drizzle/schema";
import GameBase from "@/features/letter-league/components/GameBase";
import { LetterLeagueGameProvider } from "@/features/letter-league/letter-league-game-context";
import { useParams } from "next/navigation";

export default function PlayLetterLeagueGame() {
    const params = useParams();
    const slug = params.slug;
    
    return (
        <PageBase>
            {/* hello {slug} */}
           <LetterLeagueGameProvider
                _gameMode={GameMode.Solo}
                _id="ABCDEF"
                _maxAttemptsPerRound={4}
                _timePerTurn={30}
                _userHostId="3"
                _wordLength={7}
                _guesses={[]}                
                _currentRound={1}
                _totalRounds={6}
                _createdAt={new Date()}
            >
                <GameBase>
                </GameBase>            
            </LetterLeagueGameProvider>           
        </PageBase>
    )
}