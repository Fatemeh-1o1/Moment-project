import { useState } from 'react';
import { useUpdateMemory, useUploadMemoryMedia } from '../hooks/useMemories';
import { MOODS } from '../constants';
import type { Memory } from '../types';

interface Props {
  memory: Memory;
  onClose: () => void;
}

export function EditMemoryModal({ memory, onClose }: Props) {
  const [content, setContent] = useState(memory.content);
  const [mood, setMood] = useState(memory.mood);
  const [file, setFile] = useState<File | null>(null);
  const update = useUpdateMemory();
  const upload = useUploadMemoryMedia();

  const handleSave = async () => {
    await update.mutateAsync(
      { id: memory.id, input: { content, mood } },
    );
    if (file) {
      await upload.mutateAsync({ memoryId: memory.id, file });
    }
    onClose();
  };

  const busy = update.isPending || upload.isPending;

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center p-5"
      style={{ backdropFilter: 'blur(6px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#914c49] p-6 pt-8 shadow-2xl">
        <button onClick={onClose} className="absolute left-3 top-2 z-10 text-xl text-white/70 hover:text-white">×</button>
        <h3 className="mb-4 text-sm font-bold text-white">ویرایش یادداشت</h3>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-3 w-full resize-y rounded-xl border border-white/20 bg-white/10 p-3 text-sm leading-7 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
          rows={4}
        />

        <div className="mb-4 flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition ${
                mood === m.key ? 'bg-white text-[#914c49]' : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <img src={m.image} alt={m.label} className="size-5 rounded-full object-cover" />
              {m.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="mb-2 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/30 bg-white/5 px-4 py-3 text-xs font-bold text-white/70 hover:bg-white/10">
            <span>📎</span>
            {file ? file.name : memory.media.length > 0 ? 'تغییر عکس/ویدیو/صدا' : 'افزودن عکس، ویدیو یا صدا'}
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={busy}
            className="flex-1 rounded-xl bg-white py-2.5 text-xs font-bold text-[#914c49] transition-all hover:bg-white/90 active:scale-95 disabled:opacity-50"
          >
            {busy ? 'در حال ذخیره...' : 'ذخیره'}
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white/80 hover:bg-white/20"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}