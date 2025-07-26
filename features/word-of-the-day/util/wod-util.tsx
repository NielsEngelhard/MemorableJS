export function utcDateIsToday(lastPlayedDate: Date | null | undefined): boolean {
  if (lastPlayedDate == null || lastPlayedDate == undefined) return false;

  const today = new Date();
  const todaysDayUTC = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));
  
  const lastPlayedDayUTC = new Date(Date.UTC(
    lastPlayedDate.getUTCFullYear(),
    lastPlayedDate.getUTCMonth(),
    lastPlayedDate.getUTCDate()
  ));
  
  return lastPlayedDayUTC.getTime() === todaysDayUTC.getTime();
}