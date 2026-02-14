import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './jaroslawostapenko/intebwio', // Ensures assets are loaded correctly on GitHub Pages (subdirectory)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
