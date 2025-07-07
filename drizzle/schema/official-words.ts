import { pgTable, text, integer } from "drizzle-orm/pg-core";

export function createOfficialWordsTable(language: string) {
  return pgTable(`${language}_words`, {
    word: text().notNull().unique().primaryKey(),
    length: integer().notNull()
  });
}

// Supported languages
export const NlWordsTable = createOfficialWordsTable("nl");