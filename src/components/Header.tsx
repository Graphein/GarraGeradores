import React, { useState } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/caminhoes', label: 'Caminhões' },
    { path: '/despesas', label: 'Despesas' },
    { path: '/relatorios', label: 'Relatórios' },
    { path: '/financas', label: 'Finanças' }
  ];

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck size={32} />
            <h1 className="text-2xl font-bold">Garra Geradores</h1>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === item.path ? 'text-blue-200' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            {menuItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`block py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
                  location.pathname === item.path ? 'bg-blue-700' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}