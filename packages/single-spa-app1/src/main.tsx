import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

let app:ReactDOM.Root | undefined
function run(name:string) {
  const rootDom = document.getElementById(name)
  if (rootDom) {
    rootDom.style.display = 'block'
    app = ReactDOM.createRoot(rootDom)
    app.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}

// 单独启动子应用
if (import.meta.env.DEV) {
  run('root')
}

// 以下为微前端方式启动
export const bootstrap = ()  => {
  return Promise.resolve()
}

export const mount = (props:any) => {
  const { name, setGlobalState } = props
  setGlobalState({
    frame: 'React',
    frameVersion: React.version,
  })

  run(name)
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
