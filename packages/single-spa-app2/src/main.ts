import { createApp, version } from 'vue'
import App from './App.vue'
import genRouter from './router/index'

let app:ReturnType<typeof createApp> | undefined
function run(name:string, base?:string) {
  app = createApp(App)
  const router = genRouter(base)
  app.use(router)
  const dom = document.getElementById(name)
  if (dom) {
    dom.style.display = 'block'
  }
  app.mount(dom!)
}

if (import.meta.env.DEV) {
  run('app')
}

export const bootstrap = ()  => {
  return Promise.resolve()
}

export const mount = (props:any) => {
  const { name, setGlobalState, base } = props
  setGlobalState({
    frame: 'Vue',
    frameVersion: version,
  })

  run(name, base)
  return Promise.resolve()
}

export const unmount = (props:any) => {
  const { name } = props
  const rootDom = document.getElementById(name)
  app?.unmount()
  if (rootDom) {
    rootDom.style.display = 'none'
    rootDom.innerHTML = ''
  }
  return Promise.resolve()
}
