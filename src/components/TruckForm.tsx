import React, { useState, useEffect } from 'react';
import type { Truck } from '../types';

interface TruckFormProps {
  onSubmit: (truck: Omit<Truck, 'id'>) => void;
  onCancel: () => void;
  initialData?: Truck | null;
}

export function TruckForm({ onSubmit, onCancel, initialData }: TruckFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    model: '',
    year: new Date().getFullYear(),
    imageUrl: '',
    lastRefuel: '',
    nextMaintenance: '',
    generator: {
      name: '',
      model: '',
      power: '',
      serialNumber: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Informações do Caminhão</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Caminhão
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Garra 05"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placa
          </label>
          <input
            type="text"
            required
            value={formData.plate}
            onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ABC-1234"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modelo
          </label>
          <input
            type="text"
            required
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Mercedes-Benz Atego"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ano
          </label>
          <input
            type="number"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Último Abastecimento
          </label>
          <input
            type="date"
            required
            value={formData.lastRefuel}
            onChange={(e) => setFormData({ ...formData, lastRefuel: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Próxima Manutenção
          </label>
          <input
            type="date"
            required
            value={formData.nextMaintenance}
            onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Informações do Gerador</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Gerador
          </label>
          <input
            type="text"
            required
            value={formData.generator.name}
            onChange={(e) => setFormData({
              ...formData,
              generator: { ...formData.generator, name: e.target.value }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Gerador 150kVA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modelo do Gerador
          </label>
          <input
            type="text"
            required
            value={formData.generator.model}
            onChange={(e) => setFormData({
              ...formData,
              generator: { ...formData.generator, model: e.target.value }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Stemac"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Potência
          </label>
          <input
            type="text"
            required
            value={formData.generator.power}
            onChange={(e) => setFormData({
              ...formData,
              generator: { ...formData.generator, power: e.target.value }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: 150 kVA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Série
          </label>
          <input
            type="text"
            required
            value={formData.generator.serialNumber}
            onChange={(e) => setFormData({
              ...formData,
              generator: { ...formData.generator, serialNumber: e.target.value }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: GEN123456"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {initialData ? 'Salvar Alterações' : 'Adicionar Caminhão'}
        </button>
      </div>
    </form>
  );
}