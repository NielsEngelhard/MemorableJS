import { GameMode } from "@/drizzle/schema";
import React, { createContext, useContext, useState } from "react";
import { LETTER_ANIMATION_TIME_MS, TIME_BETWEEN_ROUNDS_MS } from "./game-constants";
import { GameModel, GamePlayerModel, RoundModel } from "./models";
import GuessWord from "./actions/command/guess-word";

type ActiveGameContextType = {
    maxAttemptsPerRound: number;
    wordLength: number;
    submitGuess: (guess: string) => void;
    timePerTurn?: number | null;
    totalRounds: number;
    gameMode: GameMode;
    createdAt: Date;
    rounds: RoundModel[];
    currentRoundIndex: number;
    currentGuessIndex: number;
    currentRound: RoundModel;
    theWord: string | undefined;
    players: GamePlayerModel[];
}

const ActiveGameContext = createContext<ActiveGameContextType | undefined>(undefined);

interface ActiveGameProviderProps {
  game: GameModel;
  children: React.ReactNode;
}

export function ActiveGameProvider({ children, game }: ActiveGameProviderProps) {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(game.currentRoundIndex);
    const [rounds, setRounds] = useState<RoundModel[]>(game.rounds);
    const [currentRound, setCurrentRound] = useState<RoundModel>(getCurrentRound());
    const [currentGuessIndex, setCurrentGuessIndex] = useState(currentRound.currentGuessIndex);
    const [theWord, setTheWord] = useState<string | undefined>(undefined);
    const [players, setPlayers] = useState<GamePlayerModel[]>(game.players);

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

      var response = await GuessWord({
        gameId: id,
        word: guess
      });
      
      setCurrentRound(prevRound => ({
        ...prevRound,
        guesses: [...prevRound.guesses, response.guessResult],
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

    function getCurrentRound(): RoundModel {
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

    return (
        <ActiveGameContext.Provider value={{
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
          players
          }}
        >
          {children}
        </ActiveGameContext.Provider>
    )
}

export function useActiveGame() {
  const context = useContext(ActiveGameContext);
  if (context === undefined) {
    throw new Error('useActiveGame must be used within an ActiveGameProvider');
  }
  return context;
}