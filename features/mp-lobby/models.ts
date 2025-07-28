import { MultiplayerMode } from "@/drizzle/schema/enum/multiplayer-mode";

export interface MpLobbyModel {
    id: string;
    hostId: string;
    mode: MultiplayerMode;
    createdAt: Date;
    players: MpLobbyPlayerModel[];
}

export interface MpLobbyPlayerModel {
    id: string;
    username: string;
    colorHex?: string | undefined | null;
}