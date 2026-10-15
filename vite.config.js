import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Pre-renders the SPA to static HTML at build time so Googlebot
    // sees real content without executing JavaScript.
    prerender({
      staticDir: 'dist',
      routes: ['/'],
    }),
  ],
  build: {
    // Inline small assets into JS to reduce HTTP round-trips (better LCP)
    assetsInlineLimit: 4096,
    // Increase chunk size warning threshold — Three.js + GSAP are legitimately large
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Vendor code-split for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap'],
        },
      },
    },
  },
})
