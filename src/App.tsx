import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { TrucksPage } from './pages/TrucksPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ReportsPage } from './pages/ReportsPage';

function App() {
  return (
    <BrowserRouter basename="/GarraGeradores"> {/* Adicionando o basename */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/caminhoes" element={<TrucksPage />} />
        <Route path="/despesas" element={<ExpensesPage />} />
        <Route path="/relatorios" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
