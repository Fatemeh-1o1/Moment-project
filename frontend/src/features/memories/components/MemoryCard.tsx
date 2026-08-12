import { Pin } from '../../../components/ui/Pin';
import { formatPersianDate } from '../../../lib/date';
import { moodByKey } from '../constants';
import { useDeleteMemory } from '../hooks/useMemories';
import type { Memory } from '../types';

const papers = ['bg-paper-yellow', 'bg-paper-pink', 'bg-paper-mint', 'bg-paper-blue', 'bg-paper-orange'];

export function MemoryCard({ memory, index = 0 }: { memory: Memory; index?: number }) {
  const mood = moodByKey(memory.mood);
  const remove = useDeleteMemory();
  const media = memory.media[0];

  return (
    <article
      className={`paper p-4 pt-6 ${papers[index % papers.length]} ${index % 2 ? 'rotate-[.5deg]' : '-rotate-[.5deg]'}`}
    >
      <Pin color={mood.pin} className="-top-2 left-1/2 -translate-x-1/2" />
      <div className="relative z-[1]">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-soft-ink">
          <img src={mood.image} alt={mood.label} className="size-7 rounded-md object-cover" />
          <time>{formatPersianDate(memory.memoryDate, { day: 'numeric', month: 'long' })}</time>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7">{memory.content}</p>
        {media?.type === 'image' && (
          <img className="mt-3 h-28 w-full rounded-md object-cover" src={media.url} alt="تصویر خاطره" />
        )}
        {media?.type === 'video' && (
          <video className="mt-3 h-28 w-full rounded-md object-cover" src={media.url} controls />
        )}
        <button
          onClick={() => confirm('این یادداشت پاک شود؟') && remove.mutate(memory.id)}
          className="mt-3 text-[11px] font-bold text-soft-ink/70 hover:text-pin-red"
        >
          پاک کردن
        </button>
      </div>
    </article>
  );
}
