import path from 'path'
import { defineConfig, UserConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import pkg from './package.json'

const PORT = 5000
const baseConfig:UserConfig = {
  server: {
    port: PORT,
  },
  plugins: [
    vue(),
    vitePluginForArco({ style: 'css' }),
  ],
  build: {
    lib: {
      entry: path.join(__dirname, './src/main.ts'),
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

