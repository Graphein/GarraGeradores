import React from 'react';
import { Fuel, WrenchIcon, Calendar, Pencil, Trash2, Zap } from 'lucide-react';
import type { Truck } from '../types';

interface TruckCardProps {
  truck: Truck;
  onEdit: (truck: Truck) => void;
  onDelete: (id: string) => void;
}

export function TruckCard({ truck, onEdit, onDelete }: TruckCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={truck.imageUrl} 
          alt={truck.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(truck)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Editar"
          >
            <Pencil size={16} className="text-blue-600" />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Tem certeza que deseja excluir este caminhão?')) {
                onDelete(truck.id);
              }
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Excluir"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{truck.name}</h3>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Ativo
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Ano: {truck.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel size={16} />
            <span>Último abastecimento: {truck.lastRefuel}</span>
          </div>
          <div className="flex items-center gap-2">
            <WrenchIcon size={16} />
            <span>Próxima manutenção: {truck.nextMaintenance}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-600">Placa: {truck.plate}</p>
        </div>

        {truck.generator && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              Gerador
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Nome: {truck.generator.name}</p>
              <p>Modelo: {truck.generator.model}</p>
              <p>Potência: {truck.generator.power}</p>
              <p>Série: {truck.generator.serialNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}