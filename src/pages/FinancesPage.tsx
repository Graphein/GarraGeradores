import React, { useState } from 'react';
import { Header } from '../components/Header';
import { FinanceForm } from '../components/FinanceForm';
import { FinanceList } from '../components/FinanceList';
import { useFinances } from '../hooks/useFinances';
import type { Finance } from '../types';

export function FinancesPage() {
  const { finances, addFinance, updateFinance, deleteFinance } = useFinances();
  const [showForm, setShowForm] = useState(false);
  const [editingFinance, setEditingFinance] = useState<Finance | null>(null);

  const handleSubmit = (finance: Finance) => {
    if (editingFinance) {
      updateFinance(editingFinance.id, finance);
      setEditingFinance(null);
    } else {
      addFinance(finance);
    }
    setShowForm(false);
  };

  const totalIncome = finances
    .filter(f => f.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = finances
    .filter(f => f.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const profit = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Finanças</h2>
          <button
            onClick={() => {
              setEditingFinance(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Novo Registro
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Receitas</h3>
            <p className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Despesas</h3>
            <p className="text-2xl font-bold text-red-600">
              {totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Lucro</h3>
            <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingFinance ? 'Editar Registro' : 'Novo Registro'}
            </h3>
            <FinanceForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingFinance(null);
              }}
              initialData={editingFinance}
            />
          </div>
        )}

        <FinanceList 
          finances={finances}
          onEdit={(finance) => {
            setEditingFinance(finance);
            setShowForm(true);
          }}
          onDelete={deleteFinance}
        />
      </main>
    </div>
  );
}