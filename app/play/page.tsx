import PageBase from "@/components/layout/PageBase";
import FadedText from "@/components/ui/text/FadedText";
import GameCard from "@/features/game/components/GameCard";
import { Brain, Grid3X3 } from "lucide-react";

export default function Play() {
    return (
        <PageBase>
            <div className="font-bold text-xl text-center">
                <FadedText>Choose Your Game</FadedText>
            </div>

            <p className="text-sm lg:text-lg text-foreground-muted text-center font-semibold max-w-xl">
                Discover our collection of thoughtfully designed games. Each one crafted for the modern, sophisticated player.
            </p>            

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <GameCard
                    name="LetterLeague"
                    description="This isn’t just about knowing words — it’s about using them. Think you’ve got the brains to keep up? Or are you just another wannabe who folds under pressure?"
                    fromColor="from-primary/80"
                    toColor="to-primary"
                    Icon={Grid3X3}
                    time="5-10"
                    amountOfPlayers="1-4"
                />

                <GameCard
                    name="Trivia Twister"
                    description="Comming Soon ..."
                    fromColor="from-secondary/80"
                    toColor="to-secondary"
                    Icon={Brain}
                    time="15-60"
                    amountOfPlayers="1-10"
                />                
            </div>            
        </PageBase>
    )
}