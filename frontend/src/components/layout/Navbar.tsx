import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'امروز', end: true },
  { to: '/calendar', label: 'تقویم حسی' },
  { to: '/capsules', label: 'کپسول‌های زمانی' },
];

export function Navbar() {
  return (
    <nav
      className="mb-7 flex gap-1.5 overflow-x-auto rounded-2xl bg-white/10 p-1.5 backdrop-blur-md"
      aria-label="ناوبری اصلی"
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-[#80322e] text-white shadow-lg'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}