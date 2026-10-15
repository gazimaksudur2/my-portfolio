import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
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
