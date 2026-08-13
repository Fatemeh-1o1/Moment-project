import { faNumber } from '../../lib/date';
import { persianMonthNames } from '../../features/calendar/utils/calendarUtils';

export interface PersianDateValue {
  year: number;
  month: number;
  day: number;
}

function daysInMonth(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  // اسفند
  const isLeap = (year - 1398) % 4 === 0; // تقریب کبیسه شمسی
  return isLeap ? 30 : 29;
}

export function PersianDateInput({
  value,
  onChange,
  minYear,
  maxYear,
}: {
  value: PersianDateValue;
  onChange: (value: PersianDateValue) => void;
  minYear?: number;
  maxYear?: number;
}) {
  const years = Array.from({ length: (maxYear ?? value.year + 5) - (minYear ?? value.year) + 1 }, (_, i) => (minYear ?? value.year) + i);
  const dayCount = daysInMonth(value.year, value.month);
  const days = Array.from({ length: dayCount }, (_, i) => i + 1);

  function update(next: PersianDateValue) {
    const maxDay = daysInMonth(next.year, next.month);
    onChange({ ...next, day: Math.min(next.day, maxDay) });
  }

  return (
    <div className="mt-1 grid grid-cols-3 gap-2">
      <select
        aria-label="روز"
        value={Math.min(value.day, dayCount)}
        onChange={e => update({ ...value, day: Number(e.target.value) })}
        className="rounded-lg border-0 bg-white/55 px-2 py-2.5 text-sm"
      >
        {days.map(d => (
          <option key={d} value={d}>
            {faNumber(d)}
          </option>
        ))}
      </select>
      <select
        aria-label="ماه"
        value={value.month}
        onChange={e => update({ ...value, month: Number(e.target.value) })}
        className="rounded-lg border-0 bg-white/55 px-2 py-2.5 text-sm"
      >
        {persianMonthNames.map((name, i) => (
          <option key={name} value={i + 1}>
            {name}
          </option>
        ))}
      </select>
      <select
        aria-label="سال"
        value={value.year}
        onChange={e => update({ ...value, year: Number(e.target.value) })}
        className="rounded-lg border-0 bg-white/55 px-2 py-2.5 text-sm"
      >
        {years.map(y => (
          <option key={y} value={y}>
            {faNumber(y)}
          </option>
        ))}
      </select>
    </div>
  );
}