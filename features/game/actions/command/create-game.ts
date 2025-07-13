"use server";

import { GamePlayerTable, GameRoundTable, GameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { generateGameId } from "../../util/game-id-generator";
import { db } from "@/drizzle/db";
import { getCurrentUser } from "@/features/auth/current-user";
import getWords from "@/features/word/actions/query/get-official-words";
import { SupportedLanguage } from "@/features/i18n/languages";
import { CreateGameSchema } from "../../schemas";
import { GameRoundFactory } from "../../util/game-round-factory";
import { GamePlayerFactory } from "../../util/game-player-factory";

export default async function CreateGame(command: CreateGameSchema): Promise<string> {
    const userId = (await getCurrentUser())?.user.id;
    if (!userId) throw new Error("User seems not logged in");

    const words = await getWords(command.totalRounds, command.wordLength, SupportedLanguage.nl);

    const gameId = generateGameId();

    await db.transaction(async (tx) => {
        await db.insert(GameTable).values({
            id: gameId,
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

        var rounds = GameRoundFactory.createDbRounds(words, gameId);
        await db.insert(GameRoundTable).values(rounds);

        var players = GamePlayerFactory.createGamePlayer(gameId, userId);
        await db.insert(GamePlayerTable).values(players);
    });

    return gameId;
}


