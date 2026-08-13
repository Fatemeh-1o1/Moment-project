import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { formatPersianDate } from '../../../lib/date';
import { moodByKey } from '../constants';
import { useDeleteMemory } from '../hooks/useMemories';
import type { Memory } from '../types';
import { EditMemoryModal } from './EditMemoryModal';
import paperCard from '../../../img/memory-card.png';

const defaultMood = { image: '', label: 'یادداشت', pin: 'gray' as const };

export function MemoryCard({ memory, index = 0 }: { memory: Memory; index?: number }) {
  const mood = moodByKey(memory.mood) ?? defaultMood;
  const remove = useDeleteMemory();
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const isLong = memory.content.length > 100;
  const displayContent = isLong ? memory.content.slice(0, 100) + '...' : memory.content;

  return (
    <>
      <article
        onClick={() => setViewOpen(true)}
        className={`relative cursor-pointer p-4 pt-6 ${index % 2 ? 'rotate-[.5deg]' : '-rotate-[.5deg]'}`}
        style={{
          backgroundImage: `url(${paperCard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '320px',
        }}
      >
        <div className="relative z-[1] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-soft-ink">
            <img src={mood.image} alt={mood.label} className="size-8 rounded-xl object-cover" />
            <time className='text-white font-extrabold'>{formatPersianDate(memory.memoryDate, { day: 'numeric', month: 'long' })}</time>
          </div>

          <p className="whitespace-pre-wrap px-3 text-sm leading-7 line-clamp-3">
            {displayContent}
          </p>

          {isLong && (
            <span className="text-[11px] font-bold mr-5 text-soft-ink/70">
              ادامه مطلب...
            </span>
          )}

          {memory.media[0]?.type === 'image' && (
            <img
              className="mx-auto mt-1 h-28 w-[85%] rounded-md object-cover"
              src={memory.media[0].url}
              alt="تصویر خاطره"
            />
          )}

          {memory.media[0]?.type === 'audio' && (
            <div className="mx-auto mt-1 w-[85%] rounded-lg bg-white/30 p-1.5">
              <audio controls className="w-full">
                <source src={memory.media[0].url} type="audio/webm" />
                مرورگر شما از پخش صدا پشتیبانی نمی‌کند
              </audio>
            </div>
          )}
        </div>
      </article>

      {viewOpen && (
        <div
          className="fixed inset-0 z-40 grid place-items-center p-5"
          style={{ backdropFilter: 'blur(6px)' }}
          onMouseDown={(e) => e.target === e.currentTarget && setViewOpen(false)}
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[#914c49] p-6 pt-8 shadow-2xl">
            <button
              onClick={() => setViewOpen(false)}
              className="absolute left-3 top-2 z-10 text-xl text-white/70 hover:text-white"
              aria-label="بستن"
            >
              ×
            </button>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-white">
              <img src={mood.image} alt={mood.label} className="size-8 rounded-xl object-cover" />
              <time>{formatPersianDate(memory.memoryDate)}</time>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-8 text-white">{memory.content}</p>

            {memory.media[0]?.type === 'image' && (
              <img
                className="mt-3 max-h-48 w-full rounded-md object-cover"
                src={memory.media[0].url}
                alt="تصویر خاطره"
              />
            )}

            {memory.media[0]?.type === 'video' && (
              <video
                className="mt-3 max-h-48 w-full rounded-md object-cover"
                src={memory.media[0].url}
                controls
              />
            )}

            {memory.media[0]?.type === 'audio' && (
              <div className="mt-3 rounded-lg bg-white/20 p-2">
                <audio controls className="w-full">
                  <source src={memory.media[0].url} type="audio/webm" />
                  مرورگر شما از پخش صدا پشتیبانی نمی‌کند
                </audio>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-3 border-t border-white/15 pt-3">
              <button
                onClick={() => {
                  setViewOpen(false);
                  setEditOpen(true);
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white"
              >
                <Pencil size={13} />
                ویرایش
              </button>
              <button
                onClick={() => {
                  if (confirm('این یادداشت پاک شود؟')) {
                    setViewOpen(false);
                    remove.mutate(memory.id);
                  }
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-red-300"
              >
                <Trash2 size={13} />
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && <EditMemoryModal memory={memory} onClose={() => setEditOpen(false)} />}
    </>
  );
}