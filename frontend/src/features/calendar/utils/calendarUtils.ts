import type { Memory } from '../../memories/types';
import type { CalendarCell } from '../types';

const parts = (d: Date) =>
  Object.fromEntries(
    new Intl.DateTimeFormat('en-US-u-ca-persian', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
      .formatToParts(d)
      .filter((x) => x.type !== 'literal')
      .map((x) => [x.type, Number(x.value)])
  ) as { year: number; month: number; day: number };

export const persianMonthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

export const weekdayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

export function gregorianFromPersian(year: number, month: number, day: number) {
  let low = new Date(year + 620, 0, 1),
    high = new Date(year + 622, 0, 1);
  while (high.getTime() - low.getTime() > 86_400_000) {
    const mid = new Date((low.getTime() + high.getTime()) / 2);
    const p = parts(mid);
    const key = p.year * 400 + p.month * 32 + p.day,
      target = year * 400 + month * 32 + day;
    if (key < target) low = mid;
    else high = mid;
  }
  return high;
}

const iso = (d: Date) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};

export function calendarCells(year: number, month: number, memories: Memory[]): CalendarCell[] {
  const first = gregorianFromPersian(year, month, 1);
  const next = month === 12 ? gregorianFromPersian(year + 1, 1, 1) : gregorianFromPersian(year, month + 1, 1);
  const count = Math.round((next.getTime() - first.getTime()) / 86_400_000);
  const leading = (first.getDay() + 1) % 7;

  // گروه‌بندی بر اساس تاریخ
  const map = new Map<string, Memory[]>();
  for (const m of memories) {
    const date = m.memoryDate?.slice(0, 10);
    if (!date) continue;
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(m);
  }

  const today = iso(new Date());

  return [
    ...Array(leading).fill(null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ].map((day) => {
    if (day === null) return { day: null, iso: null, memories: [], isToday: false };
    const d = gregorianFromPersian(year, month, day),
      date = iso(d);
    const dayMemories = map.get(date) ?? [];
    return {
      day,
      iso: date,
      memories: dayMemories,
      isToday: date === today,
      isSpecial: dayMemories.length > 0,
    };
  });
}
export const currentPersianMonth = () => {
  const p = parts(new Date());
  return { year: p.year, month: p.month };
};

export const persianToday = () => parts(new Date());

export function daysInPersianMonth(year: number, month: number) {
  const first = gregorianFromPersian(year, month, 1);
  const next = month === 12 ? gregorianFromPersian(year + 1, 1, 1) : gregorianFromPersian(year, month + 1, 1);
  return Math.round((next.getTime() - first.getTime()) / 86_400_000);
}

export function persianToIso(year: number, month: number, day: number) {
  const d = gregorianFromPersian(year, month, day);
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}

export function comparePersianDate(
  a: { year: number; month: number; day: number },
  b: { year: number; month: number; day: number }
) {
  return a.year * 400 + a.month * 32 + a.day - (b.year * 400 + b.month * 32 + b.day);
}