import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { userRoleEnum } from "./enum/user-role";
import { id, createdAt } from "../schema-helpers";
import { UserSessionTable } from "./user-session";
import { DbUserSettings, UserSettingsTable } from "./user-settings";
import { DbUserStatistics, UserStatisticsTable } from "./user-statistics";

export const UsersTable = pgTable("users", {
    id,
    username: text().notNull(),    
    email: text().notNull(),
    hashedPassword: text().notNull(),
    salt: text().notNull(),
    role: userRoleEnum().notNull(),
    level: integer().notNull(),
    colorHex: text(),
    createdAt,

    lastWodPlayedUtc: timestamp({ mode: "date"}),

    favoriteWord: text(),
    winnerSlogan: text(),
});
export type DbUser = InferSelectModel<typeof UsersTable>;

export type DbUserProfile = DbUser & {
  settings: DbUserSettings;
  statistics: DbUserStatistics;
};

export const UserRelationships = relations(UsersTable, ({ many, one }) => ({
    session: one(UserSessionTable, {
        fields: [UsersTable.id],
        references: [UserSessionTable.userId],
    }),     
    settings: one(UserSettingsTable),
    statistics: one(UserStatisticsTable),
}));
