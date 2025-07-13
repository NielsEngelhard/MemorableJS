import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "../schema-helpers";
import { UsersTable } from "./users";
import { gameModeEnum } from "../schema";
import { InferSelectModel } from "drizzle-orm";

export const GameHistoryTable = pgTable("game_history", {
    id,
    userHostId: uuid().references(() => UsersTable.id).notNull(),
    gameMode: gameModeEnum().notNull(),
    totalScore: integer().notNull(),
    rounds: jsonb('guesses').$type<GameHistoryRound[]>().notNull(),
    players: jsonb('players').$type<GameHistoryPlayer[]>().notNull(),
    createdAt,
});

export type DbGameHistory = InferSelectModel<typeof GameHistoryTable>;
export type DbGameHistoryInsert = Omit<DbGameHistory, 'id' | 'createdAt'>;

export type GameHistoryRound = {
    index: number;
    word: string;
    guesses: string[];
    wordGuessed: boolean;
    points: number;
}

export type GameHistoryPlayer = {
    username: string;
    score: number;
}
