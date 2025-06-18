import { Clock, Grid3X3, Users } from "lucide-react";
import Button from "./Button";

export interface Props {

}

export default function Card({ }: Props) {
    return (
        <div className="duration-300 transition-all shadow-lg hover:scale-105 rounded-lg overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-gradient-to-br from-primary/90 to-primary h-32 w-full">
                <div className="flex items-end h-full p-3">
                    <div className="flex items-center gap-1 text-white font-bold">
                        <Grid3X3></Grid3X3> LetterLeague
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col gap-2">
                <p className="text-sm text-foreground">Master the art of word formation in this sophisticated Dutch word game. Guess the word letter by letter with strategic thinking.</p>
                <div className="text-xs text-foreground-muted flex flex-row gap-2 lg:gap-3">
                    <div className="flex items-center gap-1"><Users size={14} /> 1-4 players</div>
                    <div className="flex items-center gap-1"><Clock size={14} /> 5-10 min</div>
                </div>

                <Button>Play</Button>
            </div>
        </div>
    )
}