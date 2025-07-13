// BASE
export const INSTANT_CORRECT_POINTS: number = 5;
export const MISPLACED_POINTS: number = 2;
export const CORRECT_AFTER_MISPLACED_POINTS: number = 2;

// WORD GUESSED BONUS 
export const INSTANT_GUESS_BONUS: number = 10;
export const SECOND_GUESS_BONUS: number = 5;
export const THIRD_GUESS_BONUS: number = 3;

// STREAK - bonus for first time guessing letters in a streak that were not guessed yet 
export const STREAK_THRESHOLD: number = 3; // Minimal number of correct items in a row for the streak to start
export const POINTS_PER_STREAK_ITEM: number = 1;

export function CALCULATE_STREAK_POINTS(streakLength: number): number {
    if (streakLength < STREAK_THRESHOLD) return 0;

    return (streakLength - STREAK_THRESHOLD) * POINTS_PER_STREAK_ITEM;
}