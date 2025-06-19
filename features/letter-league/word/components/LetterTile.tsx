import { LetterState } from "@/drizzle/schema/enum/letter-state";

interface Props {
    state?: LetterState;
    letter?: string;
}

export default function LetterTile({ state, letter }: Props) {
    return (
        <div className={`w-12 h-12 border-2 border-border rounded-lg flex items-center justify-center
             ${state == LetterState.Correct ? 'bg-success text-white' : ''}
             ${state == LetterState.Wrong ? 'bg-error text-white' : ''}
             ${state == LetterState.WrongPosition ? 'bg-warning text-white' : ''}
             ${!state && !letter ? 'bg-border/30' : ''}
             ${!state && letter ? 'bg-primary/20 border-primary/40' : ''}`}>
            <span className="font-bold text-lg uppercase">{letter}</span>
        </div>
    )
}