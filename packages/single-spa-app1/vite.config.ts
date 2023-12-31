import path from 'path'
import { defineConfig, UserConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginForArco } from '@arco-plugins/vite-react'
import pkg from './package.json'

const PORT = 4000
const baseConfig:UserConfig = {
  server: {
    port: PORT,
  },
  plugins: [
    react(),
    vitePluginForArco({ style: 'css' }),
  ],
  build: {
    lib: {
      entry: path.join(__dirname, './src/main.tsx'),
      name: pkg.name,
      formats: ['umd'],
    },
  },
  preview: {
    port: PORT,
    cors: {
      credentials: true,
    }
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const envConfig:UserConfig = {
    define: {},
    build: {},
  }
  if (command === 'serve') {
    // 开发配置
    envConfig.define['process.env.NODE_ENV'] = '"development"'
  } else {
    // 生产配置
    envConfig.define['process.env.NODE_ENV'] = '"production"'
    envConfig.base = `http://localhost:${PORT}/`
    envConfig.build.watch = {}
  }
  return mergeConfig(baseConfig, envConfig)
})
