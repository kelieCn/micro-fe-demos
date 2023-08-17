import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginForArco } from '@arco-plugins/vite-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    react(),
    vitePluginForArco({ style: 'css' }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'single-spa-app1',
      formats: ['umd'],
    },
    minify: false,
  },
  base: 'http://localhost:4000/',
  preview: {
    port: 4000,
    cors: {
      credentials: true,
    }
  },
})
