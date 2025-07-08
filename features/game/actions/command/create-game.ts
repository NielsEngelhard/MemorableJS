"use server";

import { GameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { generateGameId } from "../../util/game-id-generator";
import { db } from "@/drizzle/db";
import { getCurrentUser } from "@/features/auth/current-user";
import getWords from "@/features/word/actions/query/get-official-words";
import { SupportedLanguage } from "@/features/i18n/languages";
import { CreateGameSchema } from "../../schemas";

export default async function CreateGame(command: CreateGameSchema) {
    const words = await getWords(command.totalRounds, command.wordLength, SupportedLanguage.nl);

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
