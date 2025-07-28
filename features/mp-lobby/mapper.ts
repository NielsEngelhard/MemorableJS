import { DbMultiplayerLobby, DbMultiplayerLobbyPlayer } from "@/drizzle/schema/multiplayer-lobby";
import { MpLobbyModel, MpLobbyPlayerModel } from "./models";
import { UserModel } from "../auth/models";

export function MapMpLobbyToModel(lobby: DbMultiplayerLobby): MpLobbyModel {
    return {
        id: lobby.id,
        createdAt: lobby.createdAt,
        hostId: lobby.userHostId,
        mode: lobby.multiplayerMode,
        players: lobby.players.map(p => MapMpLobbyPlayer(p))
    }
}

export function MapMpLobbyPlayer(player: DbMultiplayerLobbyPlayer): MpLobbyPlayerModel {
    return {
        id: player.userId,
        username: player.username
    }
}

export function MapUserToMpLobbyPlayer(user: UserModel): DbMultiplayerLobbyPlayer {
    return {
        userId: user.id,
        username: user.username,
        colorHex: user.colorHex
    }
}