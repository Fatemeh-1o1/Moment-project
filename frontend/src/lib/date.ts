export const faNumber = (value: string | number) => String(value).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!);

export const isoToday = () => {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
};

// نام ماه‌های شمسی
const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

// تبدیل میلادی به شمسی
function toJalali(date: Date): { year: number; month: number; day: number } {
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy = date.getFullYear() - 1600;
  let gm = date.getMonth();
  let gd = date.getDate() - 1;

  let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

  for (let i = 0; i < gm; ++i) g_day_no += g_days_in_month[i]!;
  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) g_day_no++;
  g_day_no += gd;

  let j_day_no = g_day_no - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no = j_day_no % 12053;
  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no = j_day_no % 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  let jm = 0;
  for (let i = 0; i < 11 && j_day_no >= j_days_in_month[i]!; ++i) {
    j_day_no -= j_days_in_month[i]!;
    jm++;
  }

  return { year: jy, month: jm, day: j_day_no + 1 };
}

export function formatPersianDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
): string {
  if (!value) return '';

  try {
    const date = new Date(typeof value === 'string' ? `${value}T12:00:00` : value);
    if (isNaN(date.getTime())) return '';

    const j = toJalali(date);
    const parts: string[] = [];

    if (options.day === 'numeric') parts.push(faNumber(j.day));
    if (options.month === 'long') parts.push(persianMonths[j.month]!);
    if (options.month === 'numeric') parts.push(faNumber(j.month + 1));
    if (options.year === 'numeric') parts.push(faNumber(j.year));

    return parts.join(' ');
  } catch {
    return '';
  }
}

export const daysUntil = (iso: string) => {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return 0;
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86_400_000));
};