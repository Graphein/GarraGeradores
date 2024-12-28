import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Expense } from '../types';
import { useDataAccess } from './useDataAccess';
import { useTrucks } from './useTrucks';

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
  getFilteredExpenses: () => Expense[];
  version: number;
}

export const useExpenses = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      version: 1,
      addExpense: (expense) => {
        set((state) => {
          const { trucks, updateTruck } = useTrucks.getState();
          const truck = trucks.find(t => t.id === expense.truckId);
          
          if (truck) {
            if (expense.type === 'fuel') {
              updateTruck(truck.id, { ...truck, lastRefuel: expense.date });
            } else if (expense.type === 'maintenance') {
              const nextMaintenanceDate = new Date(expense.date);
              nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3);
              updateTruck(truck.id, { 
                ...truck, 
                nextMaintenance: nextMaintenanceDate.toISOString().split('T')[0] 
              });
            }
          }

          return {
            expenses: [expense, ...state.expenses],
          };
        });
      },
      updateExpense: (id, expense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? expense : e
          ),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      getFilteredExpenses: () => {
        const { filterExpenseData } = useDataAccess();
        return get().expenses
          .map(filterExpenseData)
          .filter((expense): expense is Expense => expense !== null);
      },
    }),
    {
      name: 'expenses-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, version: 1 };
        }
        return persistedState as ExpenseStore;
      },
    }
  )
);