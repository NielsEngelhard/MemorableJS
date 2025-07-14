import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { InferSelectModel, relations } from "drizzle-orm";
import { id } from "../schema-helpers";

export const UserSettingsTable = pgTable("user_settings", {
    id,
    userId: uuid().references(() => UsersTable.id, { onDelete: "cascade" }),
    showOnScreenKeyboard: boolean().notNull().default(true),
    playSoundEffects: boolean().notNull().default(true),
    preFillWord: boolean().notNull().default(true),    
});

export type DbUserSettings = InferSelectModel<typeof UserSettingsTable>;

export const userSettingsRelations = relations(UserSettingsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [UserSettingsTable.userId],
        references: [UsersTable.id],
    }),
}));