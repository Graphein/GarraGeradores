import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth';
import { hashPassword, verifyPassword } from '../utils/crypto';

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// In a real app, only store hashed passwords
const USERS = [
  {
    id: '1',
    email: 'owner@example.com',
    name: 'Owner',
    role: 'owner' as const,
    passwordHash: '5d41402abc4b2a76b9719d911017c592', // Hashed 'owner123'
    salt: 'abc123'
  },
  {
    id: '2',
    email: 'employee@example.com',
    name: 'Employee',
    role: 'employee' as const,
    passwordHash: '5d41402abc4b2a76b9719d911017c592', // Hashed 'employee123'
    salt: 'def456'
  }
];

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        const user = USERS.find(u => u.email === email);
        
        if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
          throw new Error('Credenciais inválidas');
        }

        const { passwordHash, salt, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
      },
      logout: () => set({ user: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);