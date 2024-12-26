import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Expense } from '../types';
import { useTrucks } from './useTrucks';

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

export const useExpenses = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense) => {
        set((state) => {
          // Update truck dates when adding expense
          const { trucks, updateTruck } = useTrucks.getState();
          const truck = trucks.find(t => t.id === expense.truckId);
          
          if (truck) {
            if (expense.type === 'fuel') {
              updateTruck(truck.id, { ...truck, lastRefuel: expense.date });
            } else if (expense.type === 'maintenance') {
              const nextMaintenanceDate = new Date(expense.date);
              nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3); // Set next maintenance 3 months ahead
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
    }),
    {
      name: 'expenses-storage',
    }
  )
);