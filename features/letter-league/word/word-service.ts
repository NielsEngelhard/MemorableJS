export interface IWordService {
  getWords(amountOfWords: number, wordLength: number, language: string): Promise<string[]>;
}

export class TxtFileWordService implements IWordService {
  async getWords(amountOfWords: number, wordLength: number, language: string = "nl"): Promise<string[]> {
    const fileLocation = `${process.env.NEXT_PUBLIC_LETTERLEAGUE_WORDS_BASE_ADDRESS}/${language}/${language}-${wordLength}-letter-words.txt`;

    try {
      const fileContent = await fetch(fileLocation);
      const textContent = await fileContent.text();
      
      const lines = textContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      const totalLines = lines.length;

      if (totalLines === 0) return [];
      if (amountOfWords >= totalLines) return lines; // Return all if we need more than available

      // Generate unique random line indices
      const randomIndices = new Set<number>();
      while (randomIndices.size < amountOfWords) {
        const randomIndex = Math.floor(Math.random() * totalLines);
        randomIndices.add(randomIndex);
      }

      // Get words at those indices
      return Array.from(randomIndices).map(index => lines[index]);

    } catch (error) {
      console.error(`Error reading words file at ${fileLocation}`, error);
      return [];
    }
  }
}
