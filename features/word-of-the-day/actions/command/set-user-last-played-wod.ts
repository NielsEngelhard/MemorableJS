import { db } from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { DbOrTransaction } from "@/drizzle/util/transaction-util";
import { eq } from "drizzle-orm";

export default async function SetUserLastPlayedWod(userId: string,  tx?: DbOrTransaction) {
    const dbInstance = tx || db;

    await dbInstance.update(UsersTable)
    .set({
        lastWodPlayedUtc: new Date()
    })
    .where(
        eq(UsersTable.id, userId)
    );
}