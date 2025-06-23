import { GameMode } from "@/drizzle/schema";
import { ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import React, { createContext, useContext, useState } from "react";

type LetterLeagueGameContextType = {
    currentRound: number;
    guesses: ValidatedWord[];
    maxAttemptsPerRound: number;
    wordLength: number;
}

const LetterLeagueGameContext = createContext<LetterLeagueGameContextType | undefined>(undefined);

interface LetterLeagueGameProviderProps {
  _id: string;
  _userHostId: string;
  _timePerTurn: number;
  _maxAttemptsPerRound: number;
  _currentRound: number;
  _totalRounds: number;
  _gameMode: GameMode;
  _createdAt: Date;
  _wordLength: number;
  _guesses?: ValidatedWord[];
  children: React.ReactNode;
}

export function LetterLeagueGameProvider({ children, _currentRound, _totalRounds, _guesses = [], _id, _userHostId, _createdAt, _gameMode, _maxAttemptsPerRound, _timePerTurn, _wordLength }: LetterLeagueGameProviderProps) {
    const [currentRound, setCurrentRound] = useState(_currentRound);
    const [guesses, setGuesses] = useState<ValidatedWord[]>(_guesses);

    const id = _id;
    const userHostid = _userHostId;
    const timePerTurn = _timePerTurn;
    const totalRounds = _totalRounds;
    const maxAttemptsPerRound = _maxAttemptsPerRound;
    const gameMode = _gameMode;
    const createdAt = _createdAt;
    const wordLength = _wordLength;

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