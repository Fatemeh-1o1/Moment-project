import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Pin } from '../../../components/ui/Pin';
import { Textarea } from '../../../components/ui/Textarea';
import { formatPersianDate, isoToday } from '../../../lib/date';
import { useCreateMemory, useUploadMemoryMedia } from '../hooks/useMemories';
import type { MoodKey } from '../types';
import { MediaUploader } from './MediaUploader';
import { MoodPicker } from './MoodPicker';

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
    <form onSubmit={submit} className="relative mb-8 rotate-[.35deg] rounded-sm bg-paper-blue p-5 pt-7 shadow-paper sm:p-7">
      <Pin color="bg-pin-blue" className="-top-2 right-8" />
      <MoodPicker value={mood} onChange={setMood} />
      <Textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="امروز…" />
      <MediaUploader file={file} onChange={setFile} />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-bold text-soft-ink">{formatPersianDate(new Date())}</span>
        <Button disabled={busy || !mood || !content.trim()}>{busy ? 'در حال سنجاق…' : 'سنجاق کن'}</Button>
      </div>
    </form>
  );
}
