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
    const [currentRound, setCurrentRound] = useState<RoundModel>(getRound());
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
        guessedLetters: [...currentRound.guessedLetters, ...response.newLetters]
      }));

      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.id === response.userId
            ? { ...player, score: player.score + response.scoreResult.totalScore }
            : player
        )
      );      
      
      setCurrentGuessIndex(currentGuessIndex + 1);

      const letterAnimationLength = LETTER_ANIMATION_TIME_MS * wordLength;

      const endOfCurrentRound = response.roundTransitionData != undefined;
      if (endOfCurrentRound) {
        setTimeout(() => {
          setTheWord(response.roundTransitionData?.currentWord);
        }, letterAnimationLength);

        if (response.roundTransitionData?.isEndOfGame)
        {
          setTimeout(() => {
             triggerEndOfGame();
            }, TIME_BETWEEN_ROUNDS_MS + letterAnimationLength);          
        }
        else
        {
          setTimeout(() => {
             triggerNextRound();
            }, TIME_BETWEEN_ROUNDS_MS + letterAnimationLength);          
        }
      }      
    }

    function getRound(index?: number): RoundModel {
      if (!index) index = currentRoundIndex; 

      const round = rounds.find(r => r.roundNumber == index);
      if (!round) throw Error("Could not find current round CORRUPT STATE");
      return round;
    }

    function triggerNextRound() {
      const nextRoundIndex = currentRoundIndex + 1;
      
      setCurrentGuessIndex(1);
      setCurrentRoundIndex(nextRoundIndex);
      setCurrentRound(getRound(nextRoundIndex));
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