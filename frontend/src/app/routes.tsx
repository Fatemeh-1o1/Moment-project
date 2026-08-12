import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuth } from '../features/auth/hooks/useAuth';
import { CalendarPage } from '../pages/CalendarPage';
import { CapsulesPage } from '../pages/CapsulesPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

function PrivateRoutes() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="grid min-h-screen place-items-center text-white">لحظه‌ای صبر کن…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}
export function AppRoutes() {
  return <Routes><Route path="/login" element={<LoginPage />} /><Route element={<PrivateRoutes />}>
    <Route index element={<HomePage />} /><Route path="calendar" element={<CalendarPage />} /><Route path="capsules" element={<CapsulesPage />} />
  </Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
