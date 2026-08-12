import type { ButtonHTMLAttributes } from 'react';
export function Button({ className='', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`rounded-full bg-ink px-6 py-2.5 font-bold text-amber-50 transition active:scale-95 disabled:opacity-50 ${className}`} {...props} />; }
