import { useRef } from 'react';

export function MediaUploader({ file, onChange }: { file: File | null; onChange: (file: File | null) => void }) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-3 flex items-center gap-3">
      <input
        ref={input}
        hidden
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="rounded-xl border-2 border-dashed border-soft-ink bg-white/35 px-3 py-2 text-xs font-bold text-soft-ink"
      >
        عکس یا ویدیو یا صدا
      </button>
      {file && (
        <span className="rounded-lg bg-white px-3 py-1 text-xs shadow">
          {file.name}
          <button type="button" className="mr-2 text-pin-red" onClick={() => onChange(null)}>
            ×
          </button>
        </span>
      )}
    </div>
  );
}