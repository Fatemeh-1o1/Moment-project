export function Pin({ color='bg-pin-red', className='' }: { color?:string; className?:string }) { return <span aria-hidden className={`pin ${color} ${className}`} />; }
