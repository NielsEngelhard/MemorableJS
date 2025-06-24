import { GameMode } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { ValidatedLetter, ValidatedWord } from "@/drizzle/schema/model/letter-league-models";
import { z } from "zod";

export const createLetterLeagueGameSchema = z.object({
    wordLength: z.number().min(4).max(10),
    totalRounds: z.number().min(2).max(20),
    maxAttemptsPerRound: z.number().min(4).max(10),
    timePerTurn: z.number().optional(),
    gameVisibility: z.nativeEnum(GameVisibility).optional(),
    gameMode: z.nativeEnum(GameMode)
});
export type CreateLetterLeagueGame = z.infer<typeof createLetterLeagueGameSchema>;

export interface LetterLeagueGame {
    id: string;
    userHostId: string;
    timePerTurn?: number | null;
    maxAttemptsPerRound: number;
    currentRound: number;
    currentGuess: number;
    totalRounds: number;
    gameMode: GameMode;
    createdAt: Date;
    wordLength: number;
    rounds: LetterLeagueRound[];
}

export interface LetterLeagueGuessCommand {
    gameId: string;
    word: string;
}

export interface LetterLeagueRound {
    roundNumber: number;
    guesses: ValidatedWord[];
    guessedLetters: ValidatedLetter[];
}