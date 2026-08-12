import { useState, type FormEvent } from 'react';
import { Pin } from '../../../components/ui/Pin';
import { PersianDateInput, type PersianDateValue } from '../../../components/ui/PersianDateInput';
import { comparePersianDate, persianToday, persianToIso } from '../../calendar/utils/calendarUtils';
import { useCreateCapsule } from '../hooks/useCapsules';

export function CapsuleComposer() {
  const [content, setContent] = useState('');
  const [date, setDate] = useState<PersianDateValue>(() => persianToday());
  const create = useCreateCapsule();
  const today = persianToday();
  const dateValid = comparePersianDate(date, today) >= 0;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim() || !dateValid) return;
    await create.mutateAsync({
      content: content.trim(),
      unlockAt: new Date(`${persianToIso(date.year, date.month, date.day)}T12:00:00`).toISOString(),
    });
    setContent('');
    setDate(persianToday());
  }

  return (
    <form onSubmit={submit} className="paper mb-8 -rotate-[.35deg] bg-paper-pink p-5 pt-7 sm:p-7">
      <Pin className="-top-2 right-9" />
      <textarea
        aria-label="متن نامه به آینده"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="relative z-[1] min-h-28 w-full resize-y rounded-lg border-0 bg-white/50 p-4 text-sm leading-8 outline-none focus:bg-white/70"
        placeholder="سلام به خودم در آینده…"
      />
      <div className="relative z-[1] mt-4 flex flex-wrap items-end gap-3">
        <label className="min-w-48 flex-1 text-xs font-bold text-soft-ink">
          تاریخ باز شدن
          <PersianDateInput value={date} onChange={setDate} minYear={today.year} maxYear={today.year + 10} />
        </label>
        <button
          disabled={create.isPending || !content.trim() || !dateValid}
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          مهر و موم کن
        </button>
      </div>
      {!dateValid && <p className="relative z-[1] mt-2 text-xs font-bold text-pin-red">تاریخ باید امروز یا بعد از آن باشد.</p>}
      {create.error && <p className="relative z-[1] mt-3 text-xs font-bold text-pin-red">{create.error.message}</p>}
    </form>
  );
}
