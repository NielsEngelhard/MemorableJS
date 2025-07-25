"use server";

import { db } from "@/drizzle/db";
import { DbGameWithRoundsAndPlayers, GameMode } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/current-user";
import { GameModel } from "@/features/game/models";
import { utcDateIsToday } from "../../util/wod-util";
import { MapGameToModel } from "@/features/game/mappers";
import CreateWordOfTheDayGame from "../command/create-wod";

export default async function GetWordOfTheDayGame(userId: string): Promise<GameModel | null> {
    const user = await getCurrentUser();
    if (!user) throw Error("ERROR CREATING WOD: User is not logged in");

    if (utcDateIsToday(user.user.lastWodPlayedUtc)) return null;

    const activeWodGame = await getWodGame(userId);

    const currentGameIsValid = activeWodGame && utcDateIsToday(activeWodGame.createdAt);
    if (currentGameIsValid) {
        return MapGameToModel(activeWodGame);
    } else {
        // replace
    }

    const newGame = await CreateWordOfTheDayGame(user?.user.id, user?.user.language);

    return MapGameToModel(newGame);
}

async function getWodGame(userId: string): Promise<DbGameWithRoundsAndPlayers | null> {
    const game = await db.query.GameTable.findFirst({
        where: (game, { eq }) => eq(game.userHostId, userId) && eq(game.gameMode, GameMode.WordOfTheDay),
        with: {
            rounds: true,
        }
    });

    if (!game) return null;

    return game as unknown as DbGameWithRoundsAndPlayers;
}