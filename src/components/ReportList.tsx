import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Truck, Report } from '../types';

interface ReportListProps {
  reports: Report[];
  trucks: Truck[];
  onEdit: (report: Report) => void;
  onDelete: (id: string) => void;
}

export function ReportList({ reports, trucks, onEdit, onDelete }: ReportListProps) {
  const getTruckName = (truckId: string) => {
    return trucks.find(t => t.id === truckId)?.name || 'Caminhão não encontrado';
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {getTruckName(report.truckId)}
                </h3>
                <p className="text-gray-600">Motorista: {report.driverName}</p>
              </div>
              
              <div className="text-right">
                <p className="text-gray-600">
                  {new Date(report.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-gray-600">
                  {report.startTime} - {report.endTime}
                </p>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(report)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Editar"
              >
                <Pencil size={18} className="text-blue-600" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
                    onDelete(report.id);
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Excluir"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600">Local: {report.location}</p>
            {report.repairs && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Reparos/Observações:</h4>
                <p className="mt-1 text-gray-600">{report.repairs}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}