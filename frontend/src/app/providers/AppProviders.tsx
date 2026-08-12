import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../features/auth/hooks/useAuth';
import type { PropsWithChildren } from 'react';
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 20_000, retry: 1 } } });
export function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}><BrowserRouter><AuthProvider>{children}</AuthProvider></BrowserRouter></QueryClientProvider>;
}
