import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  base: '/GarraGeradores/',
  resolve: {
    alias: {
      crypto: 'crypto-browserify', // Adiciona o alias para o módulo crypto
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Define "global" como "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true, // Polyfill para process e buffer
        }),
      ],
    },
  },
});