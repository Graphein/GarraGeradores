import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para controlar o estado do menu

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Ícone de caminhão, visível em todas as telas */}
            <Truck size={32} />
            {/* Nome "Garra Geradores", visível apenas em telas grandes */}
            <h1 className="hidden sm:block text-2xl font-bold">Garra Geradores</h1>
          </div>

          {/* Ícone de hambúrguer para telas pequenas */}
          <button 
            className="sm:hidden text-white" 
            onClick={toggleMenu}
          >
            {/* Exibe ☰ se o menu estiver fechado, e X se estiver aberto */}
            {isMenuOpen ? '✖' : '☰'}
          </button>

          {/* Navegação */}
          <nav className={`sm:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
            <Link 
              to="/" 
              className={`hover:text-blue-200 transition-colors ${location.pathname === '/' ? 'text-blue-200' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/caminhoes" 
              className={`hover:text-blue-200 transition-colors ${location.pathname === '/caminhoes' ? 'text-blue-200' : ''}`}
            >
              Caminhões
            </Link>
            <Link 
              to="/despesas" 
              className="hover:text-blue-200 transition-colors"
            >
              Despesas
            </Link>
            <Link 
              to="/relatorios" 
              className="hover:text-blue-200 transition-colors"
            >
              Relatórios
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
