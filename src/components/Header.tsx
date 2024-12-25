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
          <div className="flex items-center space-x-2">
            {/* Ícone de caminhão, visível em telas maiores que 425px */}
            <Truck size={32} className="hidden sm:block" />
            {/* Nome "Garra Geradores", visível apenas em telas maiores que 425px */}
            <h1 className="hidden sm:block text-2xl font-bold">Garra Geradores</h1>
          </div>

          {/* Ícone de hambúrguer para telas pequenas, centralizado */}
          <button
            className="sm:hidden text-white flex justify-center items-center mx-auto"
            onClick={toggleMenu}
          >
            {/* Exibe ☰ se o menu estiver fechado, e X se estiver aberto */}
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navegação para telas grandes */}
        <nav className={`hidden sm:flex sm:space-x-6`}>
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
    </header>
  );
}
