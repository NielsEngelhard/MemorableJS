import { GameMode } from "@/drizzle/schema";
import { ValidatedLetter, ValidatedWord } from "../word/word-models";

export interface GameModel {
    id: string;
    userHostId: string;
    timePerTurn?: number | null;
    maxAttemptsPerRound: number;
    currentRoundIndex: number;
    totalRounds: number;
    gameMode: GameMode;
    createdAt: Date;
    wordLength: number;
    rounds: RoundModel[];
}

export interface RoundModel {
    id: string;
    roundNumber: number;
    currentGuessIndex: number;
    guesses: ValidatedWord[];
    guessedLetters: ValidatedLetter[];
}   