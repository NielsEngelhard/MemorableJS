import Button from "@/components/ui/Button";
import FadedText from "@/components/ui/text/FadedText";
import UspBulletPoint from "@/components/ui/UspBulletPoint";
import { APP_NAME } from "@/lib/global-constants";
import { Play, Target, Trophy, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-4xl gap-7 text-center mt-20">
      <div className="flex flex-col gap-2"> 
        <FadedText>
          <h1 className="text-6xl font-bold">{APP_NAME}</h1>
        </FadedText>

        <div className="text-3xl font-semibold">
          The Ultimate Word Guessing Challenge
        </div>

        <div className="text-2xl text-foreground-muted">
          Guess the hidden word letter by letter using strategy and deduction. Each guess reveals clues - green for correct position, yellow for wrong position, gray for letters not in the word. Can you solve it in the fewest attempts?          
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="fade">
          <div className="flex gap-1 items-center"><Play size={18} /> Start</div>
        </Button>
        <Link href="/score">
          <Button variant="skeleton" className="flex gap-1">
            <Target size={18} /> Scoring Explained  
          </Button>        
        </Link>
      </div>

      <div className="flex flex-row flex-1">
        <UspBulletPoint Icon={Zap} description="Jump right into games with no downloads required." title="Instant Play" color="primary" />
        <UspBulletPoint Icon={Trophy} description="Jump right into games with no downloads required." title="Instant Play" color="secondary" />
        <UspBulletPoint Icon={Play} description="Jump right into games with no downloads required." title="Instant Play" color="accent" />
      </div>
    </div>
  );
}
