import { LetterState } from "@/drizzle/schema/enum/letter-state";

interface Props {
    state: LetterState;
    letter?: string;
}

export default function LetterTile({ state, letter }: Props) {
    return (
        <div className="w-12 h-12 border-2 border-border bg-border/30 rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg uppercase">{letter}</span>
        </div>
    )
}