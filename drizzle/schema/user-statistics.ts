import { integer, pgTable, uuid, } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { InferSelectModel, relations } from "drizzle-orm";
import { id } from "../schema-helpers";

export const UserStatisticsTable = pgTable("user_statistics", {
    statisticsId: id,
    userId: uuid().references(() => UsersTable.id, { onDelete: "cascade" }),
    totalGamesPlayed: integer().notNull().default(0),
    highestScore: integer().notNull().default(0),    
    
    // Word of the day statistics
    wodTotalGamesPlayed: integer().notNull().default(0),
    wodTotalGamesWon: integer().notNull().default(0),
});

export type DbUserStatistics = InferSelectModel<typeof UserStatisticsTable>;

export const userStatisticsRelations = relations(UserStatisticsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [UserStatisticsTable.userId],
        references: [UsersTable.id],
    }),
}));