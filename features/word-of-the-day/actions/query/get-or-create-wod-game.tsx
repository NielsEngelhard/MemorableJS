"use server";

import { db } from "@/drizzle/db";
import { DbGameWithRoundsAndPlayers, GameMode } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/current-user";
import { GameModel } from "@/features/game/models";
import { utcDateIsToday } from "../../util/wod-util";
import { MapGameToModel } from "@/features/game/mappers";
import GetWodGameByUserId from "./get-wod-game-by-userid";
import CreateWordOfTheDayGame from "../command/create-wod-game";
import DeleteGameById from "@/features/game/actions/command/delete-game-by-id";

export default async function GetOrCreateWodGame(userId: string): Promise<GameModel | null> {
    const user = await getCurrentUser();
    if (!user) throw Error("ERROR CREATING WOD: User is not logged in");

    if (utcDateIsToday(user.user.lastWodPlayedUtc)) return null;

    const activeWodGame = await GetWodGameByUserId(userId);

    const currentGameIsValid = activeWodGame && utcDateIsToday(activeWodGame.createdAt);
    if (currentGameIsValid) {
        return MapGameToModel(activeWodGame);
    }

    const newGame = await db.transaction(async (tx) => {
        // Delete old game if it exists
        if (activeWodGame) {
            await DeleteGameById(activeWodGame.id, tx);
        }
        
        return await CreateWordOfTheDayGame(user.user.id, user.user.language, tx);
    });

    return MapGameToModel(newGame);
}