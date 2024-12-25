import React, { useState } from 'react';
import { Header } from '../components/Header';
import { TruckCard } from '../components/TruckCard';
import { TruckForm } from '../components/TruckForm';
import { useTrucks } from '../hooks/useTrucks';
import type { Truck } from '../types';

export function TrucksPage() {
  const { trucks, addTruck, updateTruck, deleteTruck } = useTrucks();
  const [showForm, setShowForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);

  const handleSubmit = (truckData: Omit<Truck, 'id'>) => {
    if (editingTruck) {
      updateTruck(editingTruck.id, { ...truckData, id: editingTruck.id });
      setEditingTruck(null);
    } else {
      addTruck({ ...truckData, id: crypto.randomUUID() });
    }
    setShowForm(false);
  };

  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Caminhões</h2>
          <button 
            onClick={() => {
              setEditingTruck(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar Caminhão
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingTruck ? 'Editar Caminhão' : 'Novo Caminhão'}
            </h3>
            <TruckForm 
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingTruck(null);
              }}
              initialData={editingTruck}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trucks.map(truck => (
            <TruckCard 
              key={truck.id} 
              truck={truck} 
              onEdit={handleEdit}
              onDelete={deleteTruck}
            />
          ))}
        </div>
      </main>
    </div>
  );
}