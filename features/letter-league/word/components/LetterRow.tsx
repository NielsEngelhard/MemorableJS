import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";
import LetterTile from "./LetterTile";

interface Props {
    letters: ValidatedLetter[];
}

export default function LetterRow({ letters }: Props) {
    return (
        <div className="flex flex-row gap-2">
            {letters.map((item, index) => (
                <LetterTile key={index} letter={item.letter} state={item.state} />
            ))}
        </div>
    )
}