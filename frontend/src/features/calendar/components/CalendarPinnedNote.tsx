import { moodByKey } from '../../memories/constants';
import type { Memory } from '../../memories/types';

export function CalendarPinnedNote({ memory }: { memory: Memory }) {
  const mood = moodByKey(memory.mood);
  const media = memory.media[0];
  const imageSrc = media?.type === 'image' ? media.url : mood.image;
  const isVideo = media?.type === 'video';

  return (
    <span className="absolute inset-[6%] -rotate-2 overflow-hidden rounded-sm bg-paper-yellow shadow-[0_4px_10px_rgba(0,0,0,.4)]">
      <span className="absolute -top-0.5 left-1/2 z-10 size-2 -translate-x-1/2 rounded-full bg-pin-red shadow" aria-hidden />
      <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      {isVideo && (
        <span className="absolute inset-0 grid place-items-center bg-black/35 text-[10px] font-bold text-white">▶</span>
      )}
    </span>
  );
}
