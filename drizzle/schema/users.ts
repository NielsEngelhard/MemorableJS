import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { userRoleEnum } from "./enum/user-role";
import { id, createdAt } from "../schema-helpers";
import { UserSessionTable } from "./user-session";

export const UsersTable = pgTable("users", {
    id,
    username: text().notNull(),    
    email: text().notNull(),
    hashedPassword: text().notNull(),
    salt: text().notNull(),
    role: userRoleEnum().notNull(),
    level: integer().notNull(),
    colorHex: text(),
    createdAt
});
export type DbUser = InferSelectModel<typeof UsersTable>;

export const UserRelationships = relations(UsersTable, ({ many, one }) => ({
    session: one(UserSessionTable, {
        fields: [UsersTable.id],
        references: [UserSessionTable.userId],
    }),      
}));
