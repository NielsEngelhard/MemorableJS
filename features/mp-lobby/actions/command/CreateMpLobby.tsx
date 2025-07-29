"use server"

import { getCurrentUser } from "@/features/auth/current-user";
import { MpLobbyModel } from "../../models";
import { generateGameId } from "@/features/game/util/game-id-generator";
import { db } from "@/drizzle/db";
import { MultiplayerLobbyTable } from "@/drizzle/schema/multiplayer-lobby";
import { MapMpLobbyToModel, MapUserToMpLobbyPlayer } from "../../mapper";

export default async function CreateMpLobby(): Promise<MpLobbyModel> {
    const user = (await getCurrentUser())?.user;
    if (!user) throw new Error("User seems not logged in");

    const gameId = generateGameId();

    const player = MapUserToMpLobbyPlayer(user);

    const mpLobby = await db.transaction(async (tx) => {
        return await tx.insert(MultiplayerLobbyTable).values({
            id: gameId,
            multiplayerMode: "standard",
            players: [player],
            userHostId: user.id,
        }).returning();
    });

    return MapMpLobbyToModel(mpLobby[0]);
}