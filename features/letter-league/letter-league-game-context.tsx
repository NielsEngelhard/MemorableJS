import { GameMode } from "@/drizzle/schema";
import React, { createContext, useContext, useState } from "react";
import { LetterLeagueGame, LetterLeagueRound } from "./schemas";
import { submitLetterLeagueGuess } from "./actions";
import { LETTER_ANIMATION_TIME_MS, TIME_BETWEEN_ROUNDS_MS } from "./letter-league-constants";
import { LetterLeagueSettings } from "@/drizzle/schema/model/letter-league-models";

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
    theWord: string | undefined;
    settings: LetterLeagueSettings;
    setSettings: (value: LetterLeagueSettings) => void;
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
    const [theWord, setTheWord] = useState<string | undefined>(undefined);
    const [settings, setSettings] = useState<LetterLeagueSettings>({ showOnScreenKeyboard: true });

    const id = game.id;
    const userHostid =  game.userHostId;
    const timePerTurn =  game.timePerTurn;
    const totalRounds =  game.totalRounds;
    const maxAttemptsPerRound =  game.maxAttemptsPerRound;
    const gameMode =  game.gameMode;
    const createdAt =  game.createdAt;
    const wordLength =  game.wordLength;

    async function submitGuess(guess: string) {
      if (guess.length != wordLength) return;

      var response = await submitLetterLeagueGuess({
        gameId: id,
        word: guess
      });
      
      setCurrentRound(prevRound => ({
        ...prevRound,
        guesses: [...prevRound.guesses, response.guess],
        guessedLetters: response.letterStates
      }));
      
      setCurrentGuessIndex(currentGuessIndex + 1);

      const letterAnimationLength = LETTER_ANIMATION_TIME_MS * wordLength;

      if (response.theWord) {
        setTimeout(() => {
          setTheWord(response.theWord);
        }, letterAnimationLength);

        setTimeout(() => {
          triggerNextRound();
        }, TIME_BETWEEN_ROUNDS_MS + letterAnimationLength);
      }      
    }

    function getCurrentRound(): LetterLeagueRound {
      const round = rounds.find(r => r.roundNumber == currentRoundIndex);
      if (!round) throw Error("Could not find current round CORRUPT STATE");
      return round;
    }

    function triggerNextRound() {
      if (currentRoundIndex >= totalRounds) {
        triggerEndOfGame();
        return;
      }

      setCurrentGuessIndex(1);
      setCurrentRoundIndex(prev => prev + 1);
      setCurrentRound(getCurrentRound());
      setTheWord(undefined);
    }

    function triggerEndOfGame() {
      console.log("end of game");
    }

    function toggleOnScreenKeyboard() {
      settings.showOnScreenKeyboard = !settings.showOnScreenKeyboard;
      setSettings(settings);
    }

    return (
        <LetterLeagueGameContext.Provider value={{
          currentGuessIndex,
          currentRoundIndex,
          maxAttemptsPerRound,
          wordLength,
          submitGuess,
          timePerTurn,
          totalRounds,
          gameMode,
          createdAt,
          rounds,
          currentRound,
          theWord,
          settings,
          setSettings }}
        >
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