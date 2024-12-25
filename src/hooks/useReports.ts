import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Report {
  id: string;
  truckId: string;
  driverName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  repairs?: string;
  createdAt: string;
}

interface ReportStore {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, report: Report) => void;
  deleteReport: (id: string) => void;
}

export const useReports = create<ReportStore>()(
  persist(
    (set) => ({
      reports: [],
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
    }
  )
);