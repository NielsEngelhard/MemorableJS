"use server";

import { db } from "@/drizzle/db";
import { GameTeaserModel } from "../../models";

export async function GetAllGameTeasersForUser(userId: string): Promise<GameTeaserModel[]> {
    const games = (await db.query.GameTable.findMany({
        where: (game, { eq }) => eq(game.userHostId, userId),
        columns: {
            id: true,
            createdAt: true,
            currentRoundIndex: true,
            gameMode: true,
            wordLength: true,
            totalRounds: true
        }
    }));

    return games;
}
