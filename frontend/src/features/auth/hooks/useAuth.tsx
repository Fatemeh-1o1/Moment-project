import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { authApi } from '../api/authApi';
import type { AuthInput, User } from '../types';
interface AuthContextValue { user:User|null; isLoading:boolean; login(input:AuthInput):Promise<void>; register(input:AuthInput):Promise<void>; logout():Promise<void> }
const AuthContext = createContext<AuthContextValue|null>(null);
export function AuthProvider({children}:PropsWithChildren) { const [user,setUser]=useState<User|null>(null); const [isLoading,setLoading]=useState(true); const client=useQueryClient();
  useEffect(()=>{ authApi.me().then(x=>setUser(x.user)).catch(()=>setUser(null)).finally(()=>setLoading(false)); },[]);
  const value=useMemo<AuthContextValue>(()=>({user,isLoading,login:async input=>setUser((await authApi.login(input)).user),register:async input=>setUser((await authApi.register(input)).user),logout:async()=>{await authApi.logout();setUser(null);client.clear();}}),[user,isLoading,client]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; }
export function useAuth(){const context=useContext(AuthContext);if(!context)throw new Error('useAuth must be inside AuthProvider');return context;}
