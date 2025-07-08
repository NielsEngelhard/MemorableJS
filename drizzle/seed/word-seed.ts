import { NlWordsTable, NlWordsTableType } from "../schema/official-words";

export default async function seedWords(db: any) {
      await db.insert(NlWordsTable).values(nlWordsToSeed);
}

const nlWordsToSeed: NlWordsTableType[] = [
// 3-letter words
  { word: "cat", length: 3 },
  { word: "dog", length: 3 },
  { word: "run", length: 3 },
  { word: "sun", length: 3 },
  { word: "map", length: 3 },
  { word: "joy", length: 3 },
  
  // 4-letter words
  { word: "book", length: 4 },
  { word: "time", length: 4 },
  { word: "wind", length: 4 },
  { word: "hope", length: 4 },
  { word: "cake", length: 4 },
  { word: "jump", length: 4 },
  
  // 5-letter words
  { word: "apple", length: 5 },
  { word: "beach", length: 5 },
  { word: "cloud", length: 5 },
  { word: "dream", length: 5 },
  { word: "earth", length: 5 },
  { word: "flame", length: 5 },
  
  // 6-letter words
  { word: "garden", length: 6 },
  { word: "sunset", length: 6 },
  { word: "coffee", length: 6 },
  { word: "winter", length: 6 },
  { word: "summer", length: 6 },
  { word: "dragon", length: 6 },
  
  // 7-letter words
  { word: "journey", length: 7 },
  { word: "freedom", length: 7 },
  { word: "harmony", length: 7 },
  { word: "mystery", length: 7 },
  { word: "rainbow", length: 7 },
  { word: "silence", length: 7 },
  
  // 8-letter words
  { word: "universe", length: 8 },
  { word: "elephant", length: 8 },
  { word: "mountain", length: 8 },
  { word: "sunshine", length: 8 },
  { word: "laughter", length: 8 },
  { word: "midnight", length: 8 },
  
  // 9-letter words
  { word: "adventure", length: 9 },
  { word: "chocolate", length: 9 },
  { word: "happiness", length: 9 },
  { word: "knowledge", length: 9 },
  { word: "waterfall", length: 9 },
  { word: "discovery", length: 9 },
  
  // 10-letter words
  { word: "technology", length: 10 },
  { word: "friendship", length: 10 },
  { word: "experience", length: 10 },
  { word: "revolution", length: 10 },
  { word: "mysterious", length: 10 },
  { word: "reflection", length: 10 },
  
  // 11-letter words
  { word: "imagination", length: 11 },
  { word: "opportunity", length: 11 },
  { word: "development", length: 11 },
  { word: "environment", length: 11 },
  { word: "inspiration", length: 11 },
  { word: "achievement", length: 11 },
  
  // 12-letter words
  { word: "conversation", length: 12 },
  { word: "relationship", length: 12 },
  { word: "architecture", length: 12 },
  { word: "intelligence", length: 12 },
  { word: "appreciation", length: 12 },
  { word: "organization", length: 12 }
]