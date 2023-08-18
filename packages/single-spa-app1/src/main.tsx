import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

export const bootstrap = ()  => {
  return Promise.resolve()
}

let app:ReactDOM.Root | undefined
export const mount = (props:any) => {
  const { name, setGlobalState } = props
  setGlobalState({
    frame: 'React',
    frameVersion: React.version,
  })

  app = ReactDOM.createRoot(document.querySelector(`#${name}`)!)
  app.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
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
