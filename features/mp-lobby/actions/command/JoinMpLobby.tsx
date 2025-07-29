"use server"

import { getCurrentUser } from "@/features/auth/current-user";
import { MpLobbyModel } from "../../models";
import { db } from "@/drizzle/db";
import { MapMpLobbyPlayer, MapMpLobbyToModel, MapUserToMpLobbyPlayer } from "../../mapper";
import { MAX_MP_LOBBY_SIZE } from "../../mp-lobby-constants";
import { UserModel } from "@/features/auth/models";
import { DbMultiplayerLobbyPlayer, MultiplayerLobbyTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { emitPlayerJoinedLobbyEvent } from "@/web-socket/game-events";

export interface JoinMpLobbyResponse {
    success: boolean;
    lobby?: MpLobbyModel;
    reason?: string;
}

export default async function JoinMpLobby(joinCode: string): Promise<JoinMpLobbyResponse> {
    const user = (await getCurrentUser())?.user;
    if (!user) throw new Error("User seems not logged in");

    const mpLobby = await db.query.MultiplayerLobbyTable.findFirst({
        where: (lobby, { eq }) => eq(lobby.id, joinCode)
    });

    if (!mpLobby) {
        return {
            success: false,
            reason: "Lobby does not exist"
        }
    };

    if (mpLobby.players.length >= MAX_MP_LOBBY_SIZE) {
        return {
            success: false,
            reason: "Lobby is full"
        }
    }

    let player = mpLobby.players.find(p => p.userId == user.id);
    if (player) {
        await reconnectUser();
    } else {
        player = await addUserToLobby(user, mpLobby.players, mpLobby.id);
    }

    emitPlayerJoinedLobbyEvent(mpLobby.id, MapMpLobbyPlayer(player));

    return {
        success: true,
        lobby: MapMpLobbyToModel(mpLobby)
    };    
}

async function addUserToLobby(user: UserModel, existingPlayers: DbMultiplayerLobbyPlayer[], mpLobbyId: string): Promise<DbMultiplayerLobbyPlayer> {
    const newPlayer = MapUserToMpLobbyPlayer(user);
    
    await db.update(MultiplayerLobbyTable)
        .set({
            players: [...existingPlayers, newPlayer],
        })
        .where(eq(MultiplayerLobbyTable.id, mpLobbyId));

    return newPlayer;
}

async function reconnectUser() {
    
}