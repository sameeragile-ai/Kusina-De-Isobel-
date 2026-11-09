/**
 * Opening Hours and Europe/London Time Utilities
 */

export interface DaySchedule {
  day: string;
  shortDay: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ...
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  text: string;
}

export const WEEKLY_HOURS: DaySchedule[] = [
  { day: 'Monday', shortDay: 'Mon', dayIndex: 1, openHour: 8, openMinute: 30, closeHour: 15, closeMinute: 0, text: '8:30am – 3:00pm' },
  { day: 'Tuesday', shortDay: 'Tue', dayIndex: 2, openHour: 9, openMinute: 0, closeHour: 14, closeMinute: 0, text: '9:00am – 2:00pm' },
  { day: 'Wednesday', shortDay: 'Wed', dayIndex: 3, openHour: 8, openMinute: 30, closeHour: 15, closeMinute: 0, text: '8:30am – 3:00pm' },
  { day: 'Thursday', shortDay: 'Thu', dayIndex: 4, openHour: 8, openMinute: 30, closeHour: 15, closeMinute: 0, text: '8:30am – 3:00pm' },
  { day: 'Friday', shortDay: 'Fri', dayIndex: 5, openHour: 8, openMinute: 30, closeHour: 15, closeMinute: 0, text: '8:30am – 3:00pm' },
  { day: 'Saturday', shortDay: 'Sat', dayIndex: 6, openHour: 9, openMinute: 0, closeHour: 15, closeMinute: 0, text: '9:00am – 3:00pm' },
  { day: 'Sunday', shortDay: 'Sun', dayIndex: 0, openHour: 9, openMinute: 0, closeHour: 15, closeMinute: 0, text: '9:00am – 3:00pm' },
];

/**
 * Returns current Date in Europe/London timezone
 */
export function getLondonNow(): Date {
  const now = new Date();
  try {
    const londonTimeString = now.toLocaleString('en-US', { timeZone: 'Europe/London' });
    return new Date(londonTimeString);
  } catch {
    return now;
  }
}

export interface StatusResult {
  isOpen: boolean;
  statusText: string;
  todaySchedule: DaySchedule;
  tomorrowSchedule: DaySchedule;
  isPastTodayClosing: boolean;
  londonTimeFormatted: string;
  dayIndex: number;
}

export function getLiveCafeStatus(): StatusResult {
  const londonNow = getLondonNow();
  const dayIndex = londonNow.getDay();
  const currentMinutes = londonNow.getHours() * 60 + londonNow.getMinutes();

  const todaySchedule = WEEKLY_HOURS.find(h => h.dayIndex === dayIndex) || WEEKLY_HOURS[0];
  const tomorrowDayIndex = (dayIndex + 1) % 7;
  const tomorrowSchedule = WEEKLY_HOURS.find(h => h.dayIndex === tomorrowDayIndex) || WEEKLY_HOURS[0];

  const openTimeMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
  const closeTimeMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

  const isOpen = currentMinutes >= openTimeMinutes && currentMinutes < closeTimeMinutes;
  const isPastTodayClosing = currentMinutes >= closeTimeMinutes;

  let statusText = '';
  if (isOpen) {
    statusText = `Open today until ${todaySchedule.closeHour > 12 ? todaySchedule.closeHour - 12 : todaySchedule.closeHour}:${todaySchedule.closeMinute === 0 ? '00' : todaySchedule.closeMinute}pm`;
  } else if (currentMinutes < openTimeMinutes) {
    statusText = `Opens today at ${todaySchedule.openHour}:${todaySchedule.openMinute === 0 ? '00' : todaySchedule.openMinute}am`;
  } else {
    statusText = `Closed now · Opens tomorrow at ${tomorrowSchedule.openHour}:${tomorrowSchedule.openMinute === 0 ? '00' : tomorrowSchedule.openMinute}am`;
  }

  const hoursStr = londonNow.getHours().toString().padStart(2, '0');
  const minsStr = londonNow.getMinutes().toString().padStart(2, '0');

  return {
    isOpen,
    statusText,
    todaySchedule,
    tomorrowSchedule,
    isPastTodayClosing,
    londonTimeFormatted: `${hoursStr}:${minsStr}`,
    dayIndex,
  };
}

/**
 * Generate 15-min collection time slots
 */
export function generateCollectionSlots(): { isTomorrow: boolean; slots: string[]; dayLabel: string } {
  const status = getLiveCafeStatus();
  const londonNow = getLondonNow();
  const currentMinutes = londonNow.getHours() * 60 + londonNow.getMinutes();

  // If today is past closing or less than 20 mins to close, switch to tomorrow
  const todayCloseMinutes = status.todaySchedule.closeHour * 60 + status.todaySchedule.closeMinute;
  const needTomorrow = status.isPastTodayClosing || (currentMinutes + 20 >= todayCloseMinutes);

  const targetSchedule = needTomorrow ? status.tomorrowSchedule : status.todaySchedule;
  const startMinuteTotal = needTomorrow
    ? targetSchedule.openHour * 60 + targetSchedule.openMinute
    : Math.max(targetSchedule.openHour * 60 + targetSchedule.openMinute, Math.ceil((currentMinutes + 20) / 15) * 15);
  const endMinuteTotal = targetSchedule.closeHour * 60 + targetSchedule.closeMinute - 15;

  const slots: string[] = [];
  for (let m = startMinuteTotal; m <= endMinuteTotal; m += 15) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const period = h >= 12 ? 'pm' : 'am';
    const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const displayMin = min < 10 ? `0${min}` : min;
    slots.push(`${displayH}:${displayMin} ${period}`);
  }

  // Fallback if slots empty (e.g. edge case)
  if (slots.length === 0) {
    slots.push(`Tomorrow at ${targetSchedule.openHour}:${targetSchedule.openMinute === 0 ? '00' : targetSchedule.openMinute}am`);
  }

  return {
    isTomorrow: needTomorrow,
    slots,
    dayLabel: needTomorrow ? `Tomorrow (${targetSchedule.day})` : `Today (${targetSchedule.day})`,
  };
}
