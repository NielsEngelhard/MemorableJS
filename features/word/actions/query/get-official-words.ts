import { db } from "@/drizzle/db";
import { officialWordsLanguageTableMap } from "@/drizzle/schema/official-words";
import { SupportedLanguage } from "@/features/i18n/languages";
import { eq, sql } from "drizzle-orm";

export default async function getWords(amount: number, wordLength: number, language: SupportedLanguage) {
    const wordsTable = officialWordsLanguageTableMap[language as SupportedLanguage];

    const words = await db.select()
        .from(wordsTable)
        .where(eq(wordsTable.length, wordLength))
        .orderBy(sql`RANDOM()`)
        .limit(amount);

    return words;
}