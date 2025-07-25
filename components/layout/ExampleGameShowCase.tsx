"use client"

import { LetterState } from "@/drizzle/schema/enum/letter-state";
import LetterRow from "@/features/word/components/LetterRow";
import { ValidatedLetter } from "@/features/word/word-models";
import { useEffect, useState } from "react";
import Card from "../ui/card/Card";
import CardBody from "../ui/card/CardBody";

const guesses: Array<ValidatedLetter[]> = [
    // Guess 1: "SPRING" - R, I, N are in WINTER but wrong positions
    [
        { position: 1, letter: 's', state: LetterState.Wrong },
        { position: 2, letter: 'p', state: LetterState.Wrong },
        { position: 3, letter: 'r', state: LetterState.Misplaced },
        { position: 4, letter: 'i', state: LetterState.Misplaced },
        { position: 5, letter: 'n', state: LetterState.Misplaced },
        { position: 6, letter: 'g', state: LetterState.Wrong }
    ],
    // Guess 2: "FRIEND" - R is misplaced, I is correct, E is misplaced, N is misplaced
    [
        { position: 1, letter: 'f', state: LetterState.Wrong },
        { position: 2, letter: 'r', state: LetterState.Misplaced },
        { position: 3, letter: 'i', state: LetterState.Misplaced },
        { position: 4, letter: 'e', state: LetterState.Misplaced },
        { position: 5, letter: 'n', state: LetterState.Misplaced },
        { position: 6, letter: 'd', state: LetterState.Wrong }
    ],
    // Guess 3: "WITHER" - W and I correct, T correct, E misplaced, R correct
    [
        { position: 1, letter: 'w', state: LetterState.Correct },
        { position: 2, letter: 'i', state: LetterState.Correct },
        { position: 3, letter: 't', state: LetterState.Misplaced },
        { position: 4, letter: 'h', state: LetterState.Wrong },
        { position: 5, letter: 'e', state: LetterState.Correct },
        { position: 6, letter: 'r', state: LetterState.Correct }
    ],
    // Guess 4: "WINTER" - All correct!
    [
        { position: 1, letter: 'w', state: LetterState.Correct },
        { position: 2, letter: 'i', state: LetterState.Correct },
        { position: 3, letter: 'n', state: LetterState.Correct },
        { position: 4, letter: 't', state: LetterState.Correct },
        { position: 5, letter: 'e', state: LetterState.Correct },
        { position: 6, letter: 'r', state: LetterState.Correct }
    ]
];

export default function ExampleGameShowCase() {    
  const [rows, setRows] = useState<Array<ValidatedLetter[]>>([guesses[0]]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (index == guesses.length) {
            setIndex((prev) => prev + 1);
            return;
        }

        if (rows.length == guesses.length) {
            setRows([guesses[0]]);
            setIndex(1);
        } else {
            setRows([...rows, guesses[index]]);
            setIndex((prev) => prev + 1);            
        }
    }, 2500);

    return () => clearInterval(intervalId);
  }, [index]);

    function displayEmptyRow(index: number) {
        const letters: ValidatedLetter[] = Array(guesses[0].length).fill({});

        return (
            <LetterRow key={index} letters={letters} />
        )
    }  

    return (
        <Card>
            <CardBody className="flex items-center">
                {rows.map((row, i) => {
                    return <LetterRow key={i} letters={row} animate={i != 0} />
                })}    
                
                {/* Empty Rows */}
                {Array.from({ length: guesses.length - index }, (_, i) => (
                    displayEmptyRow(i)
                ))}                            
            </CardBody>
        </Card>
    )
}