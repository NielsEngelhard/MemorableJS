import { GameMode } from "@/drizzle/schema";

export interface GameHistoryModel {
    id: string;
    gameMode: GameMode,
    totalScore: number;
    rounds: GameHistoryRoundModel[];
    players: GameHistoryPlayerModel[];
    creationDate: Date;
}

export interface GameHistoryRoundModel {
    index: number;
    word: string;
    guesses: string[];
    wordGuessed: boolean;
    points: number;
}

export interface GameHistoryPlayerModel {
    username: string;
    score: number;
}
