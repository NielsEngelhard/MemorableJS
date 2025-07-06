import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id } from "../schema-helpers";
import { InferSelectModel } from "drizzle-orm";

export const GameRoundTable = pgTable("game_round", {
    id,    
    roundNumber: integer().notNull(),
    word: text().notNull()
});
export type DbGameRound = InferSelectModel<typeof GameRoundTable>;