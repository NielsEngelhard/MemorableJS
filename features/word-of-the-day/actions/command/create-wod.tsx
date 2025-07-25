"use server";

import { DbGameWithRoundsAndPlayers, GameMode, GamePlayerTable, GameRoundTable, GameTable } from "@/drizzle/schema";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { db } from "@/drizzle/db";
import { SupportedLanguage } from "@/features/i18n/languages";
import { GameRoundFactory } from "@/features/game/util/game-round-factory";
import { GamePlayerFactory } from "@/features/game/util/game-player-factory";
import { generateWodGameId } from "@/features/game/util/game-id-generator";
import getWordOfTheDay from "@/features/word/actions/query/get-word-of-the-day";

export default async function CreateWordOfTheDayGame(userId: string, language: SupportedLanguage): Promise<DbGameWithRoundsAndPlayers> {
    const word = await getWordOfTheDay(language);

    const gameId = generateWodGameId(userId);

    const game = await db.transaction(async (tx) => {
        const dbGame = await tx.insert(GameTable).values({
            id: gameId,
            maxAttemptsPerRound: 6,
            totalRounds: 1,
            userHostId: userId,
            visibility: GameVisibility.Private,
            gameMode: GameMode.WordOfTheDay,
            wordLength: word.length,
            currentRoundIndex: 1,
        }).returning();

        var rounds = GameRoundFactory.createDbRounds([word], gameId);
        const dbRound = await tx.insert(GameRoundTable).values(rounds).returning();

        var players = GamePlayerFactory.createGamePlayer(gameId, userId);
        const dbPlayer = await tx.insert(GamePlayerTable).values(players).returning();

        return {
            ...dbGame[0],
            players: [dbPlayer[0]],
            rounds: [dbRound[0]]
        } as DbGameWithRoundsAndPlayers;
    });

    return game;
}


