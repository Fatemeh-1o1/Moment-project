import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Pin } from '../../../components/ui/Pin';
import { Textarea } from '../../../components/ui/Textarea';
import { formatPersianDate, isoToday } from '../../../lib/date';
import { useCreateMemory, useUploadMemoryMedia } from '../hooks/useMemories';
import type { MoodKey } from '../types';
import { MediaUploader } from './MediaUploader';
import { MoodPicker } from './MoodPicker';
import pin from '../../../img/pin.png';

export function MemoryComposer() {
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const create = useCreateMemory();
  const upload = useUploadMemoryMedia();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!mood || !content.trim()) return;
    const { memory } = await create.mutateAsync({ content: content.trim(), mood, memoryDate: isoToday() });
    if (file) await upload.mutateAsync({ memoryId: memory.id, file });
    setContent('');
    setMood(null);
    setFile(null);
  }

  const busy = create.isPending || upload.isPending;

  return (
    <form
      onSubmit={submit}
      className="relative mb-8 rotate-[.35deg] rounded-sm bg-[#80322e] p-5 pt-8 shadow-paper sm:p-7"
    >
      <Pin color="bg-red-500" className="-top-2 right-8" />

      <MoodPicker value={mood} onChange={setMood} />

      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        placeholder="امروز…"
        className="bg-transparent bg-[repeating-linear-gradient(to_bottom,transparent_0_28px,rgba(0,0,0,0.12)_28px_29px)] bg-local"
      />

      <MediaUploader file={file} onChange={setFile} />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-bold text-white text-soft-ink">{formatPersianDate(new Date())}</span>
        <Button disabled={busy || !mood || !content.trim()}>
          {busy ? 'در حال سنجاق…' : 'سنجاق کن'}
        </Button>
      </div>
    </form>
  );
}