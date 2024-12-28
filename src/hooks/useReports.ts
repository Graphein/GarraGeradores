import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Report } from '../types';

interface ReportStore {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, report: Report) => void;
  deleteReport: (id: string) => void;
  version: number;
}

export const useReports = create<ReportStore>()(
  persist(
    (set) => ({
      reports: [],
      version: 1,
      addReport: (report) =>
        set((state) => ({
          reports: [report, ...state.reports],
        })),
      updateReport: (id, report) =>
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === id ? report : r
          ),
        })),
      deleteReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'reports-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, version: 1 };
        }
        return persistedState as ReportStore;
      },
    }
  )
);