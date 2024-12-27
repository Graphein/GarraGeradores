import React, { useState } from 'react';
import { Truck, Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { path: '/', label: 'Dashboard', roles: ['owner'] },
    { path: '/caminhoes', label: 'Caminhões', roles: ['owner', 'employee'] },
    { path: '/despesas', label: 'Despesas', roles: ['owner'] },
    { path: '/relatorios', label: 'Relatórios', roles: ['owner', 'employee'] },
    { path: '/financas', label: 'Finanças', roles: ['owner'] }
  ].filter(item => item.roles.includes(user?.role || ''));

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck size={32} />
            <h1 className="text-2xl font-bold">Garra Geradores</h1>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
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
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-blue-500 pt-4">
            <nav className="flex flex-col space-y-2">
              {menuItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center ${
                    location.pathname === item.path ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full text-left"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}