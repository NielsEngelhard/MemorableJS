import PageBase from "@/components/layout/PageBase";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import { GameModeCard } from "@/features/game/components/GameModeCard";
import LetterLeagueRules from "@/features/letter-league/components/LetterLeagueRules";
import { Calendar, User, Users } from "lucide-react";

export default function LetterLeaguePage() {
    return (
        <PageBase>
            <BasicPageIntro
                title="LetterLeague"
                subText="Master the art of word formation"                
            ></BasicPageIntro>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
                <GameModeCard
                    name="Solo Game"
                    Icon={User}
                    bgColor="bg-primary/20"
                    color="text-primary/80"
                    description="Practice your word skills in a relaxed single-player environment. Perfect for honing your strategy."
                    players="1 player"
                    time="5-10 min"
                    href="/letter-league/solo"
                />

                <GameModeCard
                    name="Multiplayers Game"
                    Icon={Users}
                    bgColor="bg-secondary/20"
                    color="text-secondary/80"
                    description="Challenge friends or join random players in competitive word battles. Test your speed and vocabulary."
                    players="2-6 players"
                    time="10-20 min"
                    href="/letter-league/multiplayer"
                />    

                <GameModeCard
                    name="Word of the Day"
                    Icon={Calendar}
                    bgColor="bg-accent/20"
                    color="text-accent/80"
                    description="Daily challenge with a special word. Compete with players worldwide for the best score of the day."
                    players="Daily Challenge"
                    time="Once per day"
                    cardClassName="!border-accent/40 !border-2"
                    href="/letter-league/word-of-the-day"
                />                                
            </div>

            <LetterLeagueRules />
        </PageBase>
    )
}