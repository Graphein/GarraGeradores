import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Finance } from '../types';
import { FINANCE_CATEGORIES } from '../types';

interface FinanceListProps {
  finances: Finance[];
  onEdit: (finance: Finance) => void;
  onDelete: (id: string) => void;
}

export function FinanceList({ finances, onEdit, onDelete }: FinanceListProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {finances.map((finance) => (
            <tr key={finance.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(finance.date).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4">{finance.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {FINANCE_CATEGORIES[finance.category]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  finance.type === 'income' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {finance.type === 'income' ? 'Receita' : 'Despesa'}
                </span>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${
                finance.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(finance.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(finance)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir este registro?')) {
                        onDelete(finance.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}