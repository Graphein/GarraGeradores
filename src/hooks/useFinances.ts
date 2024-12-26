import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Finance } from '../types';

interface FinanceStore {
  finances: Finance[];
  addFinance: (finance: Finance) => void;
  updateFinance: (id: string, finance: Finance) => void;
  deleteFinance: (id: string) => void;
}

export const useFinances = create<FinanceStore>()(
  persist(
    (set) => ({
      finances: [],
      addFinance: (finance) =>
        set((state) => ({
          finances: [finance, ...state.finances],
        })),
      updateFinance: (id, finance) =>
        set((state) => ({
          finances: state.finances.map((f) =>
            f.id === id ? finance : f
          ),
        })),
      deleteFinance: (id) =>
        set((state) => ({
          finances: state.finances.filter((f) => f.id !== id),
        })),
    }),
    {
      name: 'finances-storage',
    }
  )
);