import { useAuth } from './useAuth';
import type { Truck, Expense, Report, Finance } from '../types';

export function useDataAccess() {
  const { user } = useAuth();

  const filterTruckData = (truck: Truck): Truck => {
    if (user?.role === 'owner') return truck;
    
    // Employee only sees basic truck info
    return {
      id: truck.id,
      name: truck.name,
      plate: truck.plate,
      model: truck.model,
      year: truck.year,
      imageUrl: truck.imageUrl,
      lastRefuel: truck.lastRefuel,
      nextMaintenance: truck.nextMaintenance,
      generator: {
        name: truck.generator?.name || '',
        model: truck.generator?.model || '',
        power: truck.generator?.power || '',
        serialNumber: '' // Hide sensitive data
      }
    };
  };

  const filterExpenseData = (expense: Expense): Expense | null => {
    if (user?.role === 'owner') return expense;
    return null; // Employees can't access expense data
  };

  const filterReportData = (report: Report): Report => {
    // Both roles can access report data
    return report;
  };

  const filterFinanceData = (finance: Finance): Finance | null => {
    if (user?.role === 'owner') return finance;
    return null; // Employees can't access finance data
  };

  return {
    filterTruckData,
    filterExpenseData,
    filterReportData,
    filterFinanceData
  };
}