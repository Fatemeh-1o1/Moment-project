import type { InputHTMLAttributes } from 'react';
export function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input className="w-full rounded-lg border-0 bg-white/50 px-3 py-2.5 text-ink outline-none focus:bg-white/70" {...props} />; }
