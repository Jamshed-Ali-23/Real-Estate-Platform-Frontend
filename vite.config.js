import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || mode)
    },
    
    server: {
      port: 3000,
      open: true,
      // Proxy is only used when VITE_USE_LOCAL_PROXY is set to 'true'
      proxy: env.VITE_USE_LOCAL_PROXY === 'true' ? {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      } : undefined
    },
    
    build: {
      // Production build optimizations
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['framer-motion', 'lucide-react', 'react-icons'],
            charts: ['recharts'],
            forms: ['react-hook-form', '@hookform/resolvers', 'yup']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    
    // Enable better error overlay
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'axios']
    }
  }
})
