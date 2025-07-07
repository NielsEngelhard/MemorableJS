import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { relations } from "drizzle-orm";

export const UserSettingsTable = pgTable("user_settings", {
    settingsId: text().notNull().unique().primaryKey(),
    userId: uuid().references(() => UsersTable.id, { onDelete: "cascade" }),
    showOnScreenKeyboard: boolean().notNull().default(true),
    playSoundEffects: boolean().notNull().default(true),
    preFillWord: boolean().notNull().default(true),
});

export const userSettingsRelations = relations(UserSettingsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [UserSettingsTable.userId],
        references: [UsersTable.id],
    }),
}));