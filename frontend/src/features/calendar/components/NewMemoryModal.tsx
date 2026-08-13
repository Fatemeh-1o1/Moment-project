import { useState } from 'react';
import { formatPersianDate } from '../../../lib/date';
import { useCreateMemory, useUploadMemoryMedia } from '../../memories/hooks/useMemories';
import { MOODS } from '../../memories/constants';
import type { MoodKey } from '../../memories/types';
import { VoiceRecorder } from '../../memories/components/VoiceRecorder';

interface Props {
  date: string;
  onClose: () => void;
}

export function NewMemoryModal({ date, onClose }: Props) {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodKey>('happy');
  const [file, setFile] = useState<File | null>(null);
  const create = useCreateMemory();
  const upload = useUploadMemoryMedia();

  const handleSubmit = async () => {
    if (!content.trim() && !file) return;
    const { memory } = await create.mutateAsync({
      content: content.trim() || '...',
      mood,
      memoryDate: date,
    });
    if (file) {
      await upload.mutateAsync({ memoryId: memory.id, file });
    }
    onClose();
  };

  const busy = create.isPending || upload.isPending;

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center p-5"
      style={{ backdropFilter: 'blur(6px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#823e3b] p-6 pt-8 shadow-2xl">
        <button onClick={onClose} className="absolute left-3 top-2 z-10 text-xl text-white/70 hover:text-white">×</button>

        <h3 className="mb-3 text-sm font-bold text-white">
          یادداشت برای {formatPersianDate(date)}
        </h3>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="این روز چطور بود؟"
          className="mb-3 w-full resize-y rounded-xl border border-white/20 bg-white/10 p-3 text-sm leading-7 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
        />

        <div className="mb-4 flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition ${
                mood === m.key ? 'bg-white text-[#823e3b]' : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <img src={m.image} alt={m.label} className="size-5 rounded-full object-cover" />
              {m.label}
            </button>
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/30 bg-white/5 px-4 py-3 text-xs font-bold text-white/70 hover:bg-white/10">
            <span>📎</span>
            {file ? file.name : 'افزودن عکس یا ویدیو'}
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <VoiceRecorder onRecorded={(f) => setFile(f)} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={(!content.trim() && !file) || busy}
          className="w-full rounded-xl bg-white py-2.5 text-xs font-bold text-[#823e3b] transition-all hover:bg-white/90 active:scale-95 disabled:opacity-50"
        >
          {busy ? 'در حال ذخیره...' : 'ذخیره'}
        </button>
      </div>
    </div>
  );
}