import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Button from "@/components/ui/Button";
import { Award, Target } from "lucide-react";
import Link from "next/link";

export default function PlayHeader() {
    return (
    <BasicPageIntro
        Icon={Target}
        title="Game Modes"
        subText="Test your vocabulary and strategic thinking in LetterLeague. Guess the word letter by letter with skill and precision."                
    >
        <Link href="/score">
            <Button variant="accent">
                <Award /> Scoring System
            </Button>
        </Link>
    </BasicPageIntro>
    )
}