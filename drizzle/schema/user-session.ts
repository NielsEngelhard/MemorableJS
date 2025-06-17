import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { relations } from "drizzle-orm";
import { userRoleEnum } from "./enum/user-role";

export const UserSessionTable = pgTable("user_sessions", {
    sessionId: text().notNull().unique().primaryKey(),
    userId: uuid().references(() => UsersTable.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull(),
    expireDateTime: timestamp({ withTimezone: true }).notNull()
});

export const userSessionsRelations = relations(UserSessionTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [UserSessionTable.userId],
        references: [UsersTable.id],
    }),
}));