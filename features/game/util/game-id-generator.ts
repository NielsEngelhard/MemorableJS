export const GAME_ID_LENGTH = 6;
export const GAME_ID_ALLOWED_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateGameId(): string {
  let result = '';
  
  for (let i = 0; i < GAME_ID_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * GAME_ID_ALLOWED_CHARACTERS.length);
    result += GAME_ID_ALLOWED_CHARACTERS.charAt(randomIndex);
  }
  
  return result;
}

export function parseGameId(input: string): string {
  const uppercaseInput = input.toUpperCase();
  
  // Check if the input contains only valid characters (letters and numbers)
  if (!/^[A-Z0-9]+$/.test(uppercaseInput)) {
    throw new Error('Game ID can only contain letters and numbers');
  }
  
  return uppercaseInput;
}

export function generateWodGameId(userId: string) {
  return `wod-${userId}`;
}