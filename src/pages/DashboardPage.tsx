import React from 'react';
import { Header } from '../components/Header';
import { DashboardCard } from '../components/DashboardCard';
import { Truck, Fuel, WrenchIcon, DollarSign } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { useTrucks } from '../hooks/useTrucks';
import { useFinances } from '../hooks/useFinances';

export function DashboardPage() {
  const { expenses } = useExpenses();
  const { trucks } = useTrucks();
  const { finances } = useFinances();

  const totalFuel = expenses
    .filter(e => e.type === 'fuel')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalMaintenance = expenses
    .filter(e => ['maintenance', 'repair', 'tire'].includes(e.type))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncome = finances
    .filter(f => f.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalFinanceExpenses = finances
    .filter(f => f.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const profit = totalIncome - totalFinanceExpenses;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Caminhões"
            value={trucks.length.toString()}
            icon={<Truck size={24} />}
          />
          
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
            title="Lucro Total"
            value={`R$ ${profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={<DollarSign size={24} />}
            trend={profit >= 0 ? { value: 0, isPositive: true } : { value: 0, isPositive: false }}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Últimas Despesas</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Caminhão</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.slice(0, 5).map((expense) => {
                  const truck = trucks.find(t => t.id === expense.truckId);
                  return (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(expense.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {truck?.name || 'Caminhão não encontrado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {truck?.plate || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {expense.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}