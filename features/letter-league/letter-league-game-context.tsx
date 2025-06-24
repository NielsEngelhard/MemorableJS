import { GameMode } from "@/drizzle/schema";
import React, { createContext, useContext, useState } from "react";
import { LetterLeagueGame, LetterLeagueRound } from "./schemas";
import { submitLetterLeagueGuess } from "./actions";

type LetterLeagueGameContextType = {
    maxAttemptsPerRound: number;
    wordLength: number;
    submitGuess: (guess: string) => void;
    timePerTurn?: number | null;
    totalRounds: number;
    gameMode: GameMode;
    createdAt: Date;
    rounds: LetterLeagueRound[];
    currentRoundIndex: number;
    currentGuessIndex: number;
    currentRound: LetterLeagueRound;
}

const LetterLeagueGameContext = createContext<LetterLeagueGameContextType | undefined>(undefined);

interface LetterLeagueGameProviderProps {
  game: LetterLeagueGame;
  children: React.ReactNode;
}

export function LetterLeagueGameProvider({ children, game }: LetterLeagueGameProviderProps) {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(game.currentRound);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(game.currentGuess);
    const [rounds, setRounds] = useState<LetterLeagueRound[]>(game.rounds);
    const [currentRound, setCurrentRound] = useState<LetterLeagueRound>(getCurrentRound());

    const id = game.id;
    const userHostid =  game.userHostId;
    const timePerTurn =  game.timePerTurn;
    const totalRounds =  game.totalRounds;
    const maxAttemptsPerRound =  game.maxAttemptsPerRound;
    const gameMode =  game.gameMode;
    const createdAt =  game.createdAt;
    const wordLength =  game.wordLength;

    async function submitGuess(guess: string) {
      var response = await submitLetterLeagueGuess({
        gameId: id,
        word: guess
      });
      
      const updatedRounds = rounds.map(round => {
        if (round.roundNumber === currentRoundIndex) {
          return {
            ...round,
            guesses: [...round.guesses, response]
          };
        }
        return round;
      });
      
      setRounds(updatedRounds);
      setCurrentGuessIndex(currentGuessIndex + 1);
    }

    function getCurrentRound(): LetterLeagueRound {
      const round = rounds.find(r => r.roundNumber == currentRoundIndex);
      if (!round) throw Error("Could not find current round CORRUPT STATE");
      return round;
    }

    return (
        <LetterLeagueGameContext.Provider value={{ currentGuessIndex, currentRoundIndex, maxAttemptsPerRound, wordLength, submitGuess, timePerTurn, totalRounds, gameMode, createdAt, rounds, currentRound }}>
                {children}
        </LetterLeagueGameContext.Provider>
    )
}

export function useLetterLeagueGame() {
  const context = useContext(LetterLeagueGameContext);
  if (context === undefined) {
    throw new Error('useLetterLeagueGame must be used within an LetterLeagueGameProvider');
  }
  return context;
}