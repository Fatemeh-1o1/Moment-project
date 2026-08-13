import { Star } from 'lucide-react';
import { Pin } from '../../../components/ui/Pin';
import { formatPersianDate } from '../../../lib/date';
import { moodByKey } from '../../memories/constants';
import { useUpdateMemory } from '../../memories/hooks/useMemories';
import type { Memory } from '../../memories/types';

interface Props {
  memories: Memory[];
  date: string;
  onClose: () => void;
  onAddNew: () => void;
}

export function DayMemoriesModal({ memories, date, onClose, onAddNew }: Props) {
  const update = useUpdateMemory();

  const toggleSpecial = (memory: Memory) => {
    update.mutate({
      id: memory.id,
      input: { isSpecial: !memory.isSpecial },
    });
  };

  return (
    <div
      className="fixed inset-0 z-20 grid place-items-center bg-ink/40 p-5"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="خاطرات این روز"
        className="paper relative w-full max-w-md -rotate-1 bg-paper-mint p-6 pt-8 max-h-[80vh] overflow-y-auto"
      >
        <Pin color="bg-pin-turquoise" className="-top-2 right-8" />
        <button aria-label="بستن" onClick={onClose} className="absolute left-3 top-2 z-10 text-xl">
          ×
        </button>

        <h3 className="mb-4 text-sm font-bold text-soft-ink">
          {formatPersianDate(date)}
        </h3>

        <div className="flex flex-col gap-3">
          {memories.map((memory) => {
            const mood = moodByKey(memory.mood);
            const media = memory.media[0];
            return (
              <div key={memory.id} className="rounded-md bg-white/40 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-soft-ink">
                    <img src={mood.image} alt={mood.label} className="size-6 rounded-md object-cover" />
                    <span>{mood.label}</span>
                  </div>

                  <button
                    onClick={() => toggleSpecial(memory)}
                    className={`flex items-center gap-1 text-[10px] font-bold transition ${
                      memory.isSpecial
                        ? 'text-yellow-500'
                        : 'text-soft-ink/50 hover:text-soft-ink'
                    }`}
                    aria-label={memory.isSpecial ? 'حذف روز خاص' : 'علامت‌گذاری روز خاص'}
                  >
                    <Star
                      size={14}
                      className={memory.isSpecial ? 'fill-yellow-400' : ''}
                    />
                    {memory.isSpecial ? 'روز خاص' : 'علامت‌گذاری'}
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7">{memory.content}</p>
                {media?.type === 'image' && (
                  <img className="mt-2 max-h-40 w-full rounded-md object-cover" src={media.url} alt="تصویر خاطره" />
                )}
                {media?.type === 'video' && (
                  <video className="mt-2 max-h-40 w-full rounded-md object-cover" src={media.url} controls />
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onAddNew}
          className="mt-4 w-full rounded-md bg-soft-ink py-2 text-xs font-bold text-white"
        >
          + افزودن یادداشت جدید
        </button>
      </section>
    </div>
  );
}