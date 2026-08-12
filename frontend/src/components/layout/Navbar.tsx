import { NavLink } from 'react-router-dom';
const links = [{to:'/',label:'امروز',end:true},{to:'/calendar',label:'تقویم حسی'},{to:'/capsules',label:'کپسول‌های زمانی'}];
export function Navbar() { return <nav className="mb-7 flex gap-2 overflow-x-auto pb-1" aria-label="ناوبری اصلی">{links.map(link => <NavLink key={link.to} {...link} className={({isActive}) => `whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${isActive?'bg-white text-ink':'bg-white/15 text-white hover:bg-white/25'}`}>{link.label}</NavLink>)}</nav>; }
