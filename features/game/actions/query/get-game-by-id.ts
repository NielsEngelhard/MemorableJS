"use server";

import { db } from "@/drizzle/db";
import { GameModel } from "../../models";
import { DbGameWithRoundsAndPlayers } from "@/drizzle/schema";
import { MapGameToModel } from "../../mappers";

export async function GetGameById(gameId: string): Promise<GameModel | null> {
    const game = await getGame(gameId);
    return MapGameToModel(game);
}

async function getGame(gameId: string): Promise<DbGameWithRoundsAndPlayers> {
    const game = await db.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.id, gameId),
        with: {
            rounds: true,
            players: true
        }
    });

    if (!game) throw Error(`Could not find game with ID ${gameId}`);

    return game as unknown as DbGameWithRoundsAndPlayers;
}