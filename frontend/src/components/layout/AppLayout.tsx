import { Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Navbar } from './Navbar';
export function AppLayout() { const { user, logout } = useAuth(); return <div className="mx-auto min-h-screen max-w-5xl px-4 pb-20 sm:px-6">
  <header className="flex items-center justify-between py-7"><div className="font-display text-4xl text-ink drop-shadow-sm">لحظه</div><div className="flex items-center gap-2 text-sm text-white"><span className="hidden sm:inline">سلام {user?.name}</span><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-pin-red font-bold">{user?.name.at(0)}</span><button onClick={logout} className="rounded-full bg-black/20 px-3 py-1.5 text-xs hover:bg-black/30">خروج</button></div></header>
  <Navbar /><Outlet /></div>; }
