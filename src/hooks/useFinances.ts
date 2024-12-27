import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Finance } from '../types';
import { useDataAccess } from './useDataAccess';

interface FinanceStore {
  finances: Finance[];
  addFinance: (finance: Finance) => void;
  updateFinance: (id: string, finance: Finance) => void;
  deleteFinance: (id: string) => void;
  getFilteredFinances: () => Finance[];
  version: number;
}

export const useFinances = create<FinanceStore>()(
  persist(
    (set, get) => ({
      finances: [],
      version: 1,
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
      getFilteredFinances: () => {
        const { filterFinanceData } = useDataAccess();
        return get().finances
          .map(filterFinanceData)
          .filter((finance): finance is Finance => finance !== null);
      },
    }),
    {
      name: 'finances-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            version: 1,
          };
        }
        return persistedState;
      },
    }
  )
);