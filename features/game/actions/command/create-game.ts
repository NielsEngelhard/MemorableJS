"use server";

import { GameMode, GameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { z } from "zod";
import { generateGameId } from "../../util/game-id-generator";
import { db } from "@/drizzle/db";
import { getCurrentUser } from "@/features/auth/current-user";

export const createLetterLeagueGameSchema = z.object({
    wordLength: z.number().min(4).max(10),
    totalRounds: z.number().min(2).max(20),
    maxAttemptsPerRound: z.number().min(4).max(10),
    timePerTurn: z.number().optional(),
    gameVisibility: z.nativeEnum(GameVisibility).optional(),
    gameMode: z.nativeEnum(GameMode)
});
export type CreateLetterLeagueGame = z.infer<typeof createLetterLeagueGameSchema>;

export default async function CreateGame(command: CreateLetterLeagueGame) {
    const words = await getWords(command.totalRounds, command.wordLength, "nl");

    const userId = (await getCurrentUser())?.user.id;
    if (!userId) throw new Error("User seems not logged in");

    const result = await db.insert(GameTable).values({
        id: generateGameId(),
        maxAttemptsPerRound: command.maxAttemptsPerRound,
        timePerTurn: command.timePerTurn,
        totalRounds: words.length,
        userHostId: userId,
        visibility: command.gameVisibility ?? GameVisibility.Private,
        gameMode: command.gameMode,
        wordLength: command.wordLength,
        currentRoundIndex: 1,
    }).returning({
        gameId: GameTable.id
    });

    return result[0];
}

async function getWords(amount: number, wordLength: number, language: string): Promise<string[]> {
    // TODO
    return ["water", "ratje"];
}