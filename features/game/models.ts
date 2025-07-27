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
    players: GamePlayerModel[];
}

export interface GameTeaserModel {
    id: string;
    gameMode: GameMode;
    currentRoundIndex: number;
    totalRounds: number;
    createdAt: Date;
    wordLength: number;
}

export interface RoundModel {
    id: string;
    roundNumber: number;
    currentGuessIndex: number;
    guesses: ValidatedWord[];
    guessedLetters: ValidatedLetter[];
}   

export interface GamePlayerModel {
    id: string;
    score: number;
}