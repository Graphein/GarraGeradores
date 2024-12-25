export interface Truck {
  id: string;
  name: string;
  plate: string;
  model: string;
  year: number;
  imageUrl: string;
  lastRefuel: string;
  nextMaintenance: string;
  generator?: {
    name: string;
    model: string;
    power: string; // ex: "150 kVA"
    serialNumber: string;
  };
}

export interface Expense {
  id: string;
  truckId: string;
  date: string;
  type: 'fuel' | 'maintenance' | 'tire' | 'repair' | 'other';
  description: string;
  amount: number;
}

export interface Report {
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

export const EXPENSE_TYPES = {
  fuel: 'Combustível',
  maintenance: 'Manutenção Preventiva',
  tire: 'Pneus',
  repair: 'Reparos',
  other: 'Outros'
} as const;