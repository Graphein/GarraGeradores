import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/GarraGeradores/', // Caminho base do repositório no GitHub Pages
});