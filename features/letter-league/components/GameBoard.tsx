import { LetterState } from "@/drizzle/schema/enum/letter-state";
import LetterTile from "../word/LetterTile";

export default function GameBoard() {
    return (
        <div className="flex gap-2">
            <LetterTile letter="a" state={LetterState.Correct} />
            <LetterTile letter="b" state={LetterState.Wrong} />
            <LetterTile letter="c" state={LetterState.WrongPosition} />
            <LetterTile letter="d" state={LetterState.Unknown} />
            <LetterTile state={LetterState.Unknown} />
        </div>
    )
}