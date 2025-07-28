import { pgEnum } from "drizzle-orm/pg-core";

export const multiplayerModes = ["standard"] as const;
export type MultiplayerMode = (typeof multiplayerModes)[number];
export const multiplayerModeEnum = pgEnum('multiplayer_mode', multiplayerModes);