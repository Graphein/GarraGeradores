import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { TrucksPage } from './pages/TrucksPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ReportsPage } from './pages/ReportsPage';
import { FinancesPage } from './pages/FinancesPage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter
      basename="/GarraGeradores"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/caminhoes"
          element={
            <ProtectedRoute>
              <TrucksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/despesas"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financas"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <FinancesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
