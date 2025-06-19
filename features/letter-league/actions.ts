"use server"

import { db } from "@/drizzle/db";
import { getCurrentUser } from "../auth/current-user";
import { generateGameId } from "../game/game-id-generator";
import { CreateLetterLeagueGame } from "./schemas";
import GetRandomWords from "./word/actions";
import { LetterLeagueGameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";

export async function CreateGame(command: CreateLetterLeagueGame) {
    const words = GetRandomWords(command.wordLength, "nl", command.totalRounds);

    const userId = (await getCurrentUser())?.user.id;
    if (!userId) throw new Error("User seems not logged in");

    const result = await db.insert(LetterLeagueGameTable).values({
        id: generateGameId(),
        currentRound: 1,
        maxAttemptsPerRound: command.maxAttemptsPerRound,
        timePerTurn: command.timePerTurn,
        totalRounds: words.length,
        userHostId: userId,
        words: words,
        visibility: command.gameVisibility ?? GameVisibility.Private,
        gameMode: command.gameMode
        
    }).returning({
        gameId: LetterLeagueGameTable.id
    });

    return result[0];
}