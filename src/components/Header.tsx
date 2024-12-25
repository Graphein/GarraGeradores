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

  // Função para fechar o menu ao clicar em um link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Centralizar o ícone ☰ quando o menu for aberto em telas pequenas */}
          <div className={`flex items-center space-x-2 ${isMenuOpen ? 'hidden' : ''}`}>
            {/* Ícone de caminhão, visível em todas as telas, exceto quando o menu estiver aberto */}
            <Truck size={32} />
            {/* Nome "Garra Geradores", visível apenas em telas grandes */}
            <h1 className="hidden sm:block text-2xl font-bold">Garra Geradores</h1>
          </div>

          {/* Ícone de hambúrguer para telas pequenas, centralizado quando o menu estiver aberto */}
          <button
            className={`sm:hidden text-white ${isMenuOpen ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}`}
            onClick={toggleMenu}
          >
            {/* Exibe ☰ se o menu estiver fechado, e X se estiver aberto */}
            {isMenuOpen ? '✖' : '☰'}
          </button>

          {/* Navegação */}
          <nav className={`sm:flex sm:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
            <Link 
              to="/" 
              className={`hover:text-blue-200 transition-colors ${location.pathname === '/' ? 'text-blue-200' : ''}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/caminhoes" 
              className={`hover:text-blue-200 transition-colors ${location.pathname === '/caminhoes' ? 'text-blue-200' : ''}`}
              onClick={closeMenu}
            >
              Caminhões
            </Link>
            <Link 
              to="/despesas" 
              className="hover:text-blue-200 transition-colors"
              onClick={closeMenu}
            >
              Despesas
            </Link>
            <Link 
              to="/relatorios" 
              className="hover:text-blue-200 transition-colors"
              onClick={closeMenu}
            >
              Relatórios
            </Link>
          </nav>

          {/* Navegação para telas pequenas (a ser exibido apenas quando o menu estiver aberto) */}
          <nav className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} space-y-4`}>
            <Link 
              to="/" 
              className={`block hover:text-blue-200 transition-colors ${location.pathname === '/' ? 'text-blue-200' : ''}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/caminhoes" 
              className={`block hover:text-blue-200 transition-colors ${location.pathname === '/caminhoes' ? 'text-blue-200' : ''}`}
              onClick={closeMenu}
            >
              Caminhões
            </Link>
            <Link 
              to="/despesas" 
              className="block hover:text-blue-200 transition-colors"
              onClick={closeMenu}
            >
              Despesas
            </Link>
            <Link 
              to="/relatorios" 
              className="block hover:text-blue-200 transition-colors"
              onClick={closeMenu}
            >
              Relatórios
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
