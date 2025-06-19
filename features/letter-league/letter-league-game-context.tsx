import { ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import React, { createContext, useContext, useState } from "react";

type LetterLeagueGameContextType = {
    currentRound: number;
}

const LetterLeagueGameContext = createContext<LetterLeagueGameContextType | undefined>(undefined);

interface LetterLeagueGameProviderProps {
    children: React.ReactNode;
    _currentRound: number;
    _totalRounds: number;
    _guesses?: ValidatedWord[];
}

export function LetterLeagueGameProvider({ children, _currentRound, _totalRounds, _guesses = [] }: LetterLeagueGameProviderProps) {
    const [currentRound, setCurrentRound] = useState(_currentRound);
    const [guesses, setGuesses] = useState<ValidatedWord[]>(_guesses);

    const totalRounds = _totalRounds;

    return (
        <LetterLeagueGameContext.Provider value={{ currentRound }}>
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