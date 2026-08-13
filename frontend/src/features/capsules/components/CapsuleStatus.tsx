import { daysUntil, faNumber } from '../../../lib/date';
import type { Capsule } from '../types';

export function CapsuleStatus({ capsule }: { capsule: Capsule }) {
  return capsule.isLocked ? (
    <>
      <p className="mb-2 text-xs font-extrabold text-soft-ink">{faNumber(daysUntil(capsule.unlockAt))} روز مونده</p>
    </>
  ) : (
    <>
      <div className="mb-2 text-2xl">💌</div>
      <p className="mb-2 text-xs font-bold text-pin-red">وقت باز کردن رسیده!</p>
      <p className="min-h-12 whitespace-pre-wrap text-sm leading-7">{capsule.content}</p>
    </>
  );
}