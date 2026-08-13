import { faNumber } from '../../../lib/date';
import { moodByKey } from '../../memories/constants';
import type { Memory } from '../../memories/types';
import specialStar from '../../../img/fav.png';

export function CalendarPinnedNote({ memory, day, count = 1 }: { memory: Memory; day: number; count?: number }) {
  const mood = moodByKey(memory.mood);
  const media = memory.media[0];
  const imageSrc = media?.type === 'image' ? media.url : mood.image;
  const isVideo = media?.type === 'video';

  return (
    <span className="absolute inset-[6%] -rotate-2 overflow-hidden rounded-sm bg-paper-yellow shadow-[0_4px_10px_rgba(0,0,0,.4)]">
      <span className="absolute -top-0.5 left-1/2 z-20 size-2 -translate-x-1/2 rounded-full bg-pin-red shadow" aria-hidden />
      <img src={imageSrc} alt="" className="h-full w-full object-cover blur-[2px] brightness-75" />
      <span className="absolute inset-0 grid place-items-center text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        {faNumber(day)}
      </span>

      {memory.isSpecial && (
        <img
          src={specialStar}
          alt="روز خاص"
          className="absolute bottom-0.5  h-[70px] w-[55px] drop-shadow"        />
      )}

      {count > 1 && (
        <span className="absolute bottom-0.5 left-0.5 rounded-full bg-pin-red px-1 text-[8px] font-bold text-white">
          {faNumber(count)}
        </span>
      )}
      {isVideo && (
        <span className="absolute bottom-0.5 right-0.5 text-[8px] font-bold text-white/80">▶</span>
      )}
    </span>
  );
}