import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite config for the SSR/prerender build.
 * Run: `vite build --config vite.server.config.js`
 * Output: `dist/server/entry-server.js`
 */
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    ssr: true,
    target: 'node18',
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.jsx',
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
      },
    },
  },
});
