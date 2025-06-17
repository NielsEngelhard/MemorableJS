export default function generateRandomUsername(): string {
    const adjectives = [
      "Swift", "Silent", "Happy", "Brave", "Clever", "Mighty", "Witty", "Funky", "Chilly", "Jolly"
    ];
    const nouns = [
      "Tiger", "Eagle", "Panda", "Wizard", "Ninja", "Robot", "Penguin", "Lion", "Falcon", "Unicorn"
    ];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(100 + Math.random() * 9999);
  
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  }