import { LetterLeagueGameWord } from "@/drizzle/schema";

export default function GetRandomWords(wordLength: number, language: string, amount: number): LetterLeagueGameWord[] {
    return [{ round: 1, word: "water"}];
}