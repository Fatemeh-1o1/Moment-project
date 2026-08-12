import { MOODS } from '../constants';
import type { MoodKey } from '../types';

export function MoodPicker({ value, onChange }: { value: MoodKey | null; onChange: (m: MoodKey) => void }) {
  return (
    <div className="mb-5 flex flex-wrap justify-center gap-3">
      {MOODS.map(m => (
        <button
          type="button"
          key={m.key}
          onClick={() => onChange(m.key)}
          aria-pressed={value === m.key}
          className={`flex min-w-16 flex-col items-center gap-1 rounded-xl bg-white/40 px-3 py-2 text-xs font-bold text-soft-ink transition ${value === m.key ? 'scale-105 -rotate-1 bg-white shadow-md' : ''}`}
        >
          <img src={m.image} alt={m.label} className="size-10 rounded-lg object-cover" />
          {m.label}
        </button>
      ))}
    </div>
  );
}
