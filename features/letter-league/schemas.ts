import { z } from "zod";

export const createLetterLeagueGameSchema = z.object({
    wordLength: z.number().min(4).max(10),
    totalRounds: z.number().min(2).max(20),
    maxAttemptsPerRound: z.number().min(4).max(10),
    timePerTurn: z.number().optional(),
    gameVisibility: z.string().min(1, "Required")
});
export type CreateLetterLeagueGame = z.infer<typeof createLetterLeagueGameSchema>;