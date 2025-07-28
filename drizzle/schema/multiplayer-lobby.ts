import { jsonb, pgTable, uuid, text } from "drizzle-orm/pg-core";
import { createdAt } from "../schema-helpers";
import { UsersTable } from "./users";
import { multiplayerModeEnum } from "./enum/multiplayer-mode";
import { InferSelectModel } from "drizzle-orm";

export const MultiplayerLobbyTable = pgTable("multiplayer_lobby", {
    id: text().primaryKey(),
    userHostId: uuid().references(() => UsersTable.id).notNull(),
    multiplayerMode: multiplayerModeEnum().notNull(),
    players: jsonb('players').$type<DbMultiplayerLobbyPlayer[]>().notNull(),    
    createdAt,
});
export type DbMultiplayerLobby = InferSelectModel<typeof MultiplayerLobbyTable>;

export type DbMultiplayerLobbyPlayer = {
    userId: string;
    username: string;
    colorHex?: string | undefined | null;
}
