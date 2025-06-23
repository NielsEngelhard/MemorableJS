import { GameMode } from "@/drizzle/schema";
import { ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import React, { createContext, useContext, useState } from "react";
import { LetterLeagueGame } from "./schemas";

type LetterLeagueGameContextType = {
    currentRound: number;
    guesses: ValidatedWord[];
    maxAttemptsPerRound: number;
    wordLength: number;
}

const LetterLeagueGameContext = createContext<LetterLeagueGameContextType | undefined>(undefined);

interface LetterLeagueGameProviderProps {
  game: LetterLeagueGame;
  children: React.ReactNode;
}

export function LetterLeagueGameProvider({ children, game }: LetterLeagueGameProviderProps) {
    const [currentRound, setCurrentRound] = useState(game.currentRound);
    const [guesses, setGuesses] = useState<ValidatedWord[]>(game.guesses ?? []);

    const id = game.id;
    const userHostid =  game.userHostId;
    const timePerTurn =  game.timePerTurn;
    const totalRounds =  game.totalRounds;
    const maxAttemptsPerRound =  game.maxAttemptsPerRound;
    const gameMode =  game.gameMode;
    const createdAt =  game.createdAt;
    const wordLength =  game.wordLength;

    return (
        <LetterLeagueGameContext.Provider value={{ currentRound, guesses, maxAttemptsPerRound, wordLength }}>
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