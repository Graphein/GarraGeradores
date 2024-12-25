import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Fuel, WrenchIcon, Truck } from 'lucide-react';
import type { Expense } from '../types';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const totalFuel = expenses
    .filter(e => e.type === 'fuel')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalMaintenance = expenses
    .filter(e => ['maintenance', 'repair', 'tire'].includes(e.type))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard
        title="Gastos com Combustível"
        value={`R$ ${totalFuel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        icon={<Fuel size={24} />}
      />
      
      <DashboardCard
        title="Gastos com Manutenção"
        value={`R$ ${totalMaintenance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        icon={<WrenchIcon size={24} />}
      />
      
      <DashboardCard
        title="Total de Despesas"
        value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        icon={<Truck size={24} />}
      />
    </div>
  );
}