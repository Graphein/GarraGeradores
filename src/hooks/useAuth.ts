import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth';

// Usuários de demonstração
const USERS = [
  {
    id: '1',
    email: 'owner@example.com',
    password: 'owner123',
    name: 'Owner',
    role: 'owner' as const
  },
  {
    id: '2',
    email: 'employee@example.com',
    password: 'employee123',
    name: 'Employee',
    role: 'employee' as const
  }
];

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  version: number;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      version: 1,
      login: (email: string, password: string) => {
        const user = USERS.find(
          u => u.email === email && u.password === password
        );
        
        if (!user) {
          throw new Error('Email ou senha incorretos');
        }

        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
      },
      logout: () => set({ user: null })
    }),
    {
      name: 'auth-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, version: 1 };
        }
        return persistedState as AuthStore;
      }
    }
  )
);