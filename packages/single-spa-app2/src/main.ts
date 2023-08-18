import { createApp, version } from 'vue'
import App from './App.vue'

export const bootstrap = ()  => {
  return Promise.resolve()
}

let app:ReturnType<typeof createApp> | undefined
export const mount = (props:any) => {
  const { name, setGlobalState } = props
  setGlobalState({
    frame: 'Vue',
    frameVersion: version,
  })

  app = createApp(App)
  app.mount(`#${name}`)
  return Promise.resolve()
}

export const unmount = (props:any) => {
  const { name } = props
  const rootDom = document.querySelector(`#${name}`)
  app?.unmount()
  if (rootDom) {
    rootDom.innerHTML = ''
  }
  return Promise.resolve()
}
