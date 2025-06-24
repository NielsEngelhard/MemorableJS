import { LetterLeagueGameWord } from "@/drizzle/schema";

export default function GetRandomWords(wordLength: number, language: string, amount: number): LetterLeagueGameWord[] {
    return Array.from({ length: wordLength}).map((value, index) => (
      {
        round: index + 1,
        word: "water"
      }
    ));
}