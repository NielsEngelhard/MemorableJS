export function getLocalizedFullDayString(): string {
    const today = new Date();    

    return today.toLocaleDateString('en', {
    weekday: 'long', // e.g., "Sunday"
    year: 'numeric',
    month: 'long',  // e.g., "July"
    day: 'numeric'
    });
}