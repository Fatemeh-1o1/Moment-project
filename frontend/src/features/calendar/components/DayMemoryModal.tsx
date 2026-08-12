import { Pin } from '../../../components/ui/Pin';
import { formatPersianDate } from '../../../lib/date';
import { moodByKey } from '../../memories/constants';
import type { Memory } from '../../memories/types';

export function DayMemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const mood = moodByKey(memory.mood);
  const media = memory.media[0];

  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-ink/40 p-5" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-label="خاطره این روز" className="paper relative w-full max-w-md -rotate-1 bg-paper-mint p-6 pt-8">
        <Pin color="bg-pin-turquoise" className="-top-2 right-8" />
        <button aria-label="بستن" onClick={onClose} className="absolute left-3 top-2 z-10 text-xl">
          ×
        </button>
        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-soft-ink">
          <img src={mood.image} alt={mood.label} className="size-7 rounded-md object-cover" />
          <span>{formatPersianDate(memory.memoryDate)}</span>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-8">{memory.content}</p>
        {media?.type === 'image' && <img className="mt-3 max-h-48 w-full rounded-md object-cover" src={media.url} alt="تصویر خاطره" />}
        {media?.type === 'video' && <video className="mt-3 max-h-48 w-full rounded-md object-cover" src={media.url} controls />}
      </section>
    </div>
  );
}
