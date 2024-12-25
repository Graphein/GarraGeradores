import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Truck } from '../types';

interface TruckStore {
  trucks: Truck[];
  addTruck: (truck: Truck) => void;
  updateTruck: (id: string, truck: Truck) => void;
  deleteTruck: (id: string) => void;
  migrateData: () => void;
}

export const useTrucks = create<TruckStore>()(
  persist(
    (set) => ({
      trucks: [],
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
      migrateData: () =>
        set((state) => ({
          trucks: state.trucks.map(truck => ({
            ...truck,
            generator: truck.generator || {
              name: '',
              model: '',
              power: '',
              serialNumber: ''
            }
          }))
        })),
    }),
    {
      name: 'trucks-storage',
      version: 2, // Increment version to trigger migration
      onRehydrateStorage: () => (state) => {
        // Run migration after storage is rehydrated
        state?.migrateData();
      }
    }
  )
);