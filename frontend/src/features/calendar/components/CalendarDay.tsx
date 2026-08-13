import { faNumber } from '../../../lib/date';
import type { CalendarCell } from '../types';
import { CalendarPinnedNote } from './CalendarPinnedNote';

export function CalendarDay({ cell, onSelect }: { cell: CalendarCell; onSelect: () => void }) {
  if (!cell.day) return <div />;

  const hasMemories = cell.memories.length > 0;

  return (
    <button
      onClick={onSelect}
      aria-label={hasMemories ? `خاطرات روز ${cell.day}` : `افزودن خاطره برای روز ${cell.day}`}
      className={`relative aspect-square min-w-0 rounded-lg text-xs ${cell.isToday ? 'bg-white/30' : 'bg-white/10'} cursor-pointer hover:bg-white/20`}
    >
      {hasMemories ? (
        <CalendarPinnedNote memory={cell.memories[0]!} day={cell.day} count={cell.memories.length} />
      ) : (
        <span className="text-white/75">{faNumber(cell.day)}</span>
      )}
    </button>
  );
}