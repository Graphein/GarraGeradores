import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseStats } from '../components/ExpenseStats';
import { useExpenses } from '../hooks/useExpenses';
import { useTrucks } from '../hooks/useTrucks';
import type { Expense } from '../types';

export function ExpensesPage() {
  const { trucks } = useTrucks();
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (newExpense: Expense) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, newExpense);
      setEditingExpense(null);
    } else {
      addExpense(newExpense);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      deleteExpense(expenseId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Controle de Despesas</h2>
        
        <div className="mb-8">
          <ExpenseStats expenses={expenses} />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editingExpense ? 'Editar Despesa' : 'Registrar Nova Despesa'}
          </h3>
          <ExpenseForm 
            trucks={trucks} 
            onSubmit={handleAddExpense}
            initialData={editingExpense}
            isEditing={!!editingExpense}
            onCancel={editingExpense ? () => setEditingExpense(null) : undefined}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Despesas</h3>
          <ExpenseList 
            expenses={expenses} 
            trucks={trucks}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </main>
    </div>
  );
}