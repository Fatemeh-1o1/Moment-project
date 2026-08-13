import { Eye, EyeOff } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import logo from '../../../img/logo.png';
import { useAuth } from '../hooks/useAuth';

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, register } = useAuth();

  if (user) return <Navigate to="/" replace />;

  function switchMode(next: 'login' | 'register') {
    setMode(next);
    setError('');
    setShowPassword(false);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const data = new FormData(e.currentTarget);
    const input = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email')),
      password: String(data.get('password')),
    };
    try {
      await (mode === 'login' ? login(input) : register(input));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی پیش آمد');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative w-full max-w-sm rounded-3xl border border-[#80322e]/30 bg-white/10 px-8 pb-8 pt-10 shadow-2xl backdrop-blur-xl">
      <div className="text-center">
        <img src={logo} alt="لحظه" className="mx-auto mb-3 h-20 w-auto drop-shadow-lg" />
        <p className="mb-8 text-xs leading-6 text-white/90">
          جایی برای سنجاق کردن لحظه‌هایی که دوست نداری فراموش کنی 📌
        </p>

        <div className="mb-8 flex justify-center gap-2 rounded-full bg-white/10 p-1">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-[#80322e] text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            ورود
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
              mode === 'register'
                ? 'bg-[#80322e] text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            ثبت‌نام
          </button>
        </div>
      </div>

      <form
        key={mode}
        onSubmit={submit}
        className="space-y-5"
      >
        {mode === 'register' && (
          <div>
            <label className="mb-2 block text-xs font-bold text-white/90">نام</label>
            <Input
              name="name"
              required
              placeholder="نام تو"
              className="rounded-xl border w-full border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#80322e]/60 focus:bg-white/20"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-bold text-white/90">ایمیل</label>
          <Input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-xl border w-full border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#80322e]/60 focus:bg-white/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold text-white/90">رمز عبور</label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              minLength={8}
              required
              placeholder="••••••••"
              className="rounded-xl border w-full border-white/30 bg-white/10 px-4 py-3 pl-11 text-sm text-white placeholder:text-white/50 focus:border-[#80322e]/60 focus:bg-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? 'پنهان کردن رمز' : 'نمایش رمز'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/20 px-3 py-2 text-xs font-bold text-red-200">{error}</p>
        )}

        <button
          disabled={busy}
          className="w-full rounded-full bg-[#80322e] py-3.5 font-bold text-white shadow-lg transition-all hover:bg-[#6e2a26] active:scale-95 disabled:opacity-50"
        >
          {busy ? 'لحظه‌ای…' : mode === 'login' ? 'ورود به لحظه' : 'ساخت حساب و ورود'}
        </button>
      </form>
    </section>
  );
}