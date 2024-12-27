import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Truck } from '../types';
import { useDataAccess } from './useDataAccess';

interface TruckStore {
  trucks: Truck[];
  addTruck: (truck: Truck) => void;
  updateTruck: (id: string, truck: Truck) => void;
  deleteTruck: (id: string) => void;
  getFilteredTrucks: () => Truck[];
  version: number;
}

export const useTrucks = create<TruckStore>()(
  persist(
    (set, get) => ({
      trucks: [],
      version: 1,
      addTruck: (truck) =>
        set((state) => ({
          trucks: [...state.trucks, truck],
        })),
      updateTruck: (id, truck) =>
        set((state) => ({
          trucks: state.trucks.map((t) =>
            t.id === id ? truck : t
          ),
        })),
      deleteTruck: (id) =>
        set((state) => ({
          trucks: state.trucks.filter((t) => t.id !== id),
        })),
      getFilteredTrucks: () => {
        const { filterTruckData } = useDataAccess();
        return get().trucks.map(filterTruckData);
      },
    }),
    {
      name: 'trucks-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Add any migration logic here if needed
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