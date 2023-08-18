import { createApp, ref } from 'vue'
import { registerApplication, RegisterApplicationConfig, start } from 'single-spa'
import router from './router/index'
import AppLayout from './layout/AppLayout.vue'
import { initGlobalState } from './utils/initGlobalState'

const globalState = ref<Record<string, any>>({
  frame: '-',
  frameVersion: '-',
})
const action = initGlobalState(globalState.value)
action.onGlobalStateChange((state) => {
  globalState.value = state
})

const app = createApp(AppLayout, { state: globalState })
app.use(router)
app.mount('#app')

const mountApp = (url:string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url

    script.onload = resolve
    script.onerror = reject

    // 挂载子应用
    document.body.appendChild(script)
  })
}
const mountAppStyle = (url:string) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url

    link.onload = resolve
    link.onerror = reject

    // 挂载子应用
    document.head.appendChild(link)
  })
}

const loadApp = (host:string, appName:any) => {
  // 远程加载子应用
  return async () => {
    //手动挂载子应用
    try {
      await mountAppStyle(`${host}/style.css`)
    } catch { /*  */ }
    await mountApp(`${host}/${appName}.umd.cjs`)
    // 获取子应用生命周期函数
    return window[appName] as any
  }
}

const microList:RegisterApplicationConfig[] = [
  {
    name: 'single-spa-app1',
    app: loadApp('http://localhost:4000', 'single-spa-app1'),
    activeWhen: '/app1',
    customProps: {
      ...action,
    }
  },
  {
    name: 'single-spa-app2',
    app: loadApp('http://localhost:5000', 'single-spa-app2'),
    activeWhen: '/app2',
    customProps: {
      ...action,
      base: '/app2',
    }
  },
]

microList.map(registerApplication)

start()
