import { useState } from 'react';
import { useMemoryCalendar } from '../hooks/useMemoryCalendar';
import { weekdayNames } from '../utils/calendarUtils';
import { CalendarDay } from './CalendarDay';
import { CalendarHeader } from './CalendarHeader';
import { DayMemoriesModal } from './DayMemoriesModal';
import { NewMemoryModal } from './NewMemoryModal';

export function MemoryCalendar() {
  const calendar = useMemoryCalendar();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showNewMemory, setShowNewMemory] = useState<string | null>(null);

  const selectedCell = selectedDate ? calendar.cells.find((c) => c.iso === selectedDate) : null;

  return (
    <>
      <div className="rounded-2xl bg-white/10 p-4 shadow-paper backdrop-blur-sm sm:p-5">
        <CalendarHeader year={calendar.year} month={calendar.month} onMove={calendar.move} />

        <div className="mb-3 grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekdayNames.map((x) => (
            <span key={x} className="truncate text-center text-[10px] font-bold text-white/70 sm:text-xs">
              {x}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendar.cells.map((cell, i) => (
            <CalendarDay
              key={cell.iso ?? `e${i}`}
              cell={cell}
              onSelect={() => {
                if (!cell.iso) return;
                if (cell.memories.length > 0) {
                  setSelectedDate(cell.iso);
                } else {
                  setShowNewMemory(cell.iso);
                }
              }}
            />
          ))}
        </div>
      </div>

      {selectedCell && selectedDate && (
        <DayMemoriesModal
          memories={selectedCell.memories}
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onAddNew={() => {
            setSelectedDate(null);
            setShowNewMemory(selectedDate);
          }}
        />
      )}

      {showNewMemory && (
        <NewMemoryModal date={showNewMemory} onClose={() => setShowNewMemory(null)} />
      )}
    </>
  );
}   