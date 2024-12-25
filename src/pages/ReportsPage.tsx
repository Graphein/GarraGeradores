import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ReportForm } from '../components/ReportForm';
import { ReportList } from '../components/ReportList';
import { useReports } from '../hooks/useReports';
import { useTrucks } from '../hooks/useTrucks';
import type { Report } from '../types';

export function ReportsPage() {
  const { reports, addReport, updateReport, deleteReport } = useReports();
  const { trucks } = useTrucks();
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  const handleSubmit = (report: Report) => {
    if (editingReport) {
      updateReport(editingReport.id, report);
      setEditingReport(null);
    } else {
      addReport(report);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Relatórios Diários</h2>
          <button
            onClick={() => {
              setEditingReport(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Novo Relatório
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingReport ? 'Editar Relatório' : 'Novo Relatório'}
            </h3>
            <ReportForm
              trucks={trucks}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingReport(null);
              }}
              initialData={editingReport}
            />
          </div>
        )}

        <ReportList 
          reports={reports} 
          trucks={trucks}
          onEdit={(report) => {
            setEditingReport(report);
            setShowForm(true);
          }}
          onDelete={deleteReport}
        />
      </main>
    </div>
  );
}