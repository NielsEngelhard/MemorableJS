"use server"

import { db } from "@/drizzle/db";
import { officialWordsLanguageTableMap } from "@/drizzle/schema/official-words";
import { SupportedLanguage } from "@/features/i18n/languages";
import { eq, sql } from "drizzle-orm";

export default async function getWordOfTheDay(language: SupportedLanguage): Promise<string> {
    const wordsTable = officialWordsLanguageTableMap[language as SupportedLanguage];

    return "waterpolo";
}