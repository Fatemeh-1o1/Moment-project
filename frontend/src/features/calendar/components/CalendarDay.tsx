import { faNumber } from '../../../lib/date';
import type { CalendarCell } from '../types';
import { CalendarPinnedNote } from './CalendarPinnedNote';

export function CalendarDay({ cell, onSelect }: { cell: CalendarCell; onSelect: () => void }) {
  if (!cell.day) return <div />;

  return (
    <button
      onClick={onSelect}
      disabled={!cell.memory}
      aria-label={cell.memory ? `خاطره روز ${cell.day}` : `روز ${cell.day}`}
      className={`relative aspect-square min-w-0 rounded-lg text-xs ${cell.isToday ? 'bg-white/30' : 'bg-white/10'} ${cell.memory ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {cell.memory ? <CalendarPinnedNote memory={cell.memory} /> : <span className="text-white/75">{faNumber(cell.day)}</span>}
    </button>
  );
}
