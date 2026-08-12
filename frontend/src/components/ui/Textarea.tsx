import type { TextareaHTMLAttributes } from 'react';
export function Textarea({ className='', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={`w-full resize-y rounded-lg border-0 bg-white/45 px-4 py-3 leading-8 text-ink outline-none placeholder:text-soft-ink/60 focus:bg-white/65 ${className}`} {...props} />; }
