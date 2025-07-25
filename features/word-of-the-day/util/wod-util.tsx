export function canPlayWod(lastPlayedDate: Date | null | undefined): boolean {
  if (lastPlayedDate == null || lastPlayedDate == undefined) return true;

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
  
  return lastPlayedDayUTC.getTime() !== todaysDayUTC.getTime();
}