import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { TrucksPage } from './pages/TrucksPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ReportsPage } from './pages/ReportsPage';
import { FinancesPage } from './pages/FinancesPage';

export default function App() {
  return (
    <BrowserRouter basename="/GarraGeradores"> {/* Adicionando o basename */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/caminhoes" element={<TrucksPage />} />
        <Route path="/despesas" element={<ExpensesPage />} />
        <Route path="/relatorios" element={<ReportsPage />} />
        <Route path="/financas" element={<FinancesPage />} />
      </Routes>
    </BrowserRouter>
  );
}