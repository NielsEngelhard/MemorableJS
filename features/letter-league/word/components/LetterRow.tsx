import { ValidatedLetter } from "@/drizzle/schema/model/letter-league-models";
import LetterTile from "./LetterTile";
import { useEffect, useState } from "react";

interface Props {
    letters: ValidatedLetter[];
    animate?: boolean;
}

export default function LetterRow({ letters, animate = false }: Props) {
    const [visibleTiles, setVisibleTiles] = useState<number[]>([]);
    
    useEffect(() => {
        if (!animate) {
            // If not animating, show all tiles immediately
            setVisibleTiles(Array.from({ length: letters.length }, (_, i) => i));
            return;
        }
        
        // Reset visible tiles when animation starts
        setVisibleTiles([]);
        
        // Reveal tiles one by one with 300ms delay
        letters.forEach((_, index) => {
            setTimeout(() => {
                setVisibleTiles(prev => [...prev, index]);
            }, index * 300);
        });
    }, [animate, letters.length]);

    return (
        <div className="flex flex-row gap-2">
            {letters.map((item, index) => (
                visibleTiles.includes(index)
                ?
                <LetterTile 
                    key={index} 
                    letter={item.letter} 
                    state={item.state} 
                />
                :
                <LetterTile 
                    key={index} 
                />               
            ))}
        </div>
    );
}