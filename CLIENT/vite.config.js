import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  base: '/Evan-form-front-end/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  buildEnd() {
    const distDir = resolve(__dirname, 'dist');
    copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'));
    console.log('Copied index.html to 404.html for GitHub Pages.');
  },
});

