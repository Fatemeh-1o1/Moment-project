import { api } from '../../../lib/api';
import type { AuthInput, User } from '../types';
export const authApi = {
  me: () => api<{user:User}>('/auth/me'),
  login: (input:AuthInput) => api<{user:User}>('/auth/login',{method:'POST',body:JSON.stringify(input)}),
  register: (input:AuthInput) => api<{user:User}>('/auth/register',{method:'POST',body:JSON.stringify(input)}),
  logout: () => api<void>('/auth/logout',{method:'POST'})
};
