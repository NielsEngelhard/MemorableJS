export function formatDateToDayMonthNameYear(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function formatDateToDayMonthNameYearTime(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}

export function addHyphenInMiddle(input: string): string {
  if (!input) {
    return '';
  }
  
  const middleIndex = Math.floor(input.length / 2);
  return input.slice(0, middleIndex) + '-' + input.slice(middleIndex);
} 