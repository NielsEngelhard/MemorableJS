export function getLevelTitle(level: number): string {
  const titles = [
    "Rooky",               // 0
    "Beginner",            // 1
    "Word Dabbler",        // 2
    "Letter Explorer",     // 3
    "Puzzle Apprentice",   // 4
    "Word Wrangler",       // 5
    "Linguistic Novice",   // 6
    "Spelling Scout",      // 7
    "Lexical Tactician",   // 8
    "Grammar Gladiator",   // 9
    "Puzzle Pro",          // 10
    "Word Warrior",        // 11
    "Semantic Sleuth",     // 12
    "Language Ninja",      // 13
    "Vocabulary Veteran",  // 14
    "Riddle Master",       // 15
    "Lexicon Legend",      // 16
    "Syntax Sorcerer",     // 17
    "Grammar Overlord",    // 18
    "Word Demigod",        // 19
    "Ultra God Pro"        // 20
  ];

  if (level < 0) level = 0;
  if (level > 20) level = 20;

  return titles[level];
}
