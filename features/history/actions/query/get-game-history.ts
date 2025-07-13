"use server"

import { db } from "@/drizzle/db";

import { GameHistoryModel } from "../../models";
import { mapGameHistoryToModel } from "../../mapper";
import { DbGameHistory } from "@/drizzle/schema";

export default async function GetGameHistory(gameHistoryId: string): Promise<GameHistoryModel> {
    const gameHistory = await getGameHistory(gameHistoryId);
    return mapGameHistoryToModel(gameHistory);
}

async function getGameHistory(gameHistoryId: string): Promise<DbGameHistory> {
    const game = await db.query.GameHistoryTable.findFirst({
        where: (h, { eq }) => eq(h.id, gameHistoryId)
    });

    if (!game) throw Error(`Could not find game_history with ID ${gameHistoryId}`);

    return game;
}