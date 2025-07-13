import { integer, pgTable, text, primaryKey, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { GameTable } from "./game";
import { UsersTable } from "./users";

export const GamePlayerTable = pgTable("game_player", {
    userId: uuid().references(() => UsersTable.id).notNull(),
    gameId: text().references(() => GameTable.id).notNull(),
    username: text().notNull(),
    score: integer().notNull().default(0)
}, (t) => [
  primaryKey({ columns: [t.userId, t.gameId] })
]);

export type DbGamePlayer = InferSelectModel<typeof GamePlayerTable>;

export const gamePlayerRelations = relations(GamePlayerTable, ({ one }) => ({
  game: one(GameTable, {
    fields: [GamePlayerTable.gameId],
    references: [GameTable.id]
  })
}));