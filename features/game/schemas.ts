import { GameMode, GameVisibility } from "@/drizzle/schema";
import { z } from "zod";

export const createGameSchema = z.object({
    wordLength: z.number().min(4).max(10),
    totalRounds: z.number().min(1).max(20),
    maxAttemptsPerRound: z.number().min(1).max(10),
    timePerTurn: z.number().optional(),
    gameVisibility: z.nativeEnum(GameVisibility).optional(),
    gameMode: z.nativeEnum(GameMode)
});
export type CreateGameSchema = z.infer<typeof createGameSchema>;