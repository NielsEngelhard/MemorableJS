import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../schema-helpers";
import { UsersTable } from "./users";
import { gameModeEnum } from "../schema";
import { InferSelectModel } from "drizzle-orm";

export const GameHistoryTable = pgTable("game_history", {
    id: text().primaryKey(),
    userHostId: uuid().references(() => UsersTable.id).notNull(),
    gameMode: gameModeEnum().notNull(),
    totalScore: integer().notNull(),
    rounds: jsonb('guesses').$type<GameHistoryRound[]>().notNull(),
    createdAt,
});

export type DbGameHistory = InferSelectModel<typeof GameHistoryTable>;

export type GameHistoryRound = {
    index: number;
    word: string;
    guesses: string[];
    wordGuessed: boolean;
}

export type GameHistoryPlayer = {
    username: string;
    score: number;
}
